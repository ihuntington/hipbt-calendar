import { addMilliseconds, differenceInMinutes, endOfDay, formatISO, parseISO } from "date-fns";
import { Bowie, BowieTrack } from "./bowie";
import { Image, Spotify } from "./spotify";

import type { Play } from "./bowie";
import type { Track } from "./spotify";
import { getTracks, setTracks } from "./redis";

// TODO: temporary workaround until I can correct the data. Also, used in the main
// website and should be corrected there too.
// @see https://github.com/ihuntington/haveiplayedbowie/blob/main/app/src/routes/diary.js
const FALLBACK_TRACK_DURATION_MS = 1000 * 60 * 3;

// TODO: assign 15 to a global somewhere
const MINUTES_BETWEEN_EVENTS = 15;

type ListenEvent = {
	iso_date: string;
	date: Date;
	start_time: Date;
	end_time: Date;
	items: Play[];
	images: Image[];
}

function createListenEvent(item: Play): ListenEvent {
	const playedAt = parseISO(item.played_at);
	const isoDate = formatISO(playedAt);

	return {
		iso_date: isoDate,
		date: playedAt,
		items: [item],
		start_time: playedAt,
		end_time: addMilliseconds(playedAt, item.track.duration_ms || FALLBACK_TRACK_DURATION_MS),
		images: [],
	}
}

function getMinutesBetweenPlays(previousPlay: Play, currentPlay: Play) {
	const previousStartTime = parseISO(previousPlay.played_at);
	const previousEndTime = addMilliseconds(previousStartTime, previousPlay.track.duration_ms || FALLBACK_TRACK_DURATION_MS);
	return Math.abs(differenceInMinutes(previousEndTime, parseISO(currentPlay.played_at)));
}

export class CalendarWeek {
	static bowie = new Bowie();
	static spotify = new Spotify();

	username: string;
	startDate: Date;
	endDate: Date;
	events: Map<string, ListenEvent> = new Map();

	constructor(username: string, startDate: string, endDate: string) {
		this.username = username;
		this.startDate = parseISO(startDate);
		this.endDate = endOfDay(parseISO(endDate || startDate));
	}

	private async getListenEvents() {
		const plays = await CalendarWeek.bowie.getPlays(this.username, this.startDate, this.endDate);
		const listenEvents = new Map<string, ListenEvent>();

		let currentDate:string;

		plays.items.forEach((item, index, arr) => {

			if (index === 0) {
				listenEvents.set(item.played_at, createListenEvent(item));

				currentDate = item.played_at;

				return;
			}

			const diff = getMinutesBetweenPlays(arr[index - 1], item);

			if (diff < MINUTES_BETWEEN_EVENTS) {
				const event = listenEvents.get(currentDate);

				if (event) {
					const playedAt = parseISO(item.played_at);

					listenEvents.set(currentDate, {
						...event,
						items: event.items.concat(item),
						end_time: addMilliseconds(playedAt, item.track.duration_ms)  || FALLBACK_TRACK_DURATION_MS,
					})

					return;
				}
			}

			listenEvents.set(item.played_at, createListenEvent(item));

			currentDate = item.played_at;
		});

		return listenEvents;
	}

	async getEvents() {
		this.events = await this.getListenEvents();

		const spotifyResult = await this.getTracksFromSpotify();

		this.addAlbumCovers(spotifyResult);

		return Array.from(this.events.values());
	}

	private getCoverTracks() {
		const tracks: BowieTrack[] = [];

		this.events.forEach((event) => {
			tracks.push(event.items[0].track);
		});

		return tracks;
	}

	private async getTracksFromSpotify(): Promise<Track[]> {
		const spotifyIds = this.getCoverTracks().map((t) => t.spotify_id);
		let cached = await getTracks(spotifyIds) as Track[];

		if (cached) {
			return cached;
		}

		const response = await CalendarWeek.spotify.getTracks(spotifyIds);

		if (response.tracks.length) {
			await setTracks(spotifyIds, JSON.stringify(response.tracks));
		}

		return response.tracks;
	}

	private addAlbumCovers(tracks: Track[]) {
		this.events.forEach((event, key, events) => {
			const track = tracks.find((t) => t.id === event.items[0].track.spotify_id);

			events.set(key, {
				...event,
				images: track?.album.images || [],
			});
		});
	}
}

// const week = new CalendarWeek("ian", "2023-01-09", "2023-01-15")
// const events = await week.getEvents()
// const tracks = await week.getTracksFromSpotify()

