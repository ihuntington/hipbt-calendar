import { addMilliseconds, differenceInMinutes, endOfDay, formatISO, parseISO } from "date-fns";
import { Bowie } from "./bowie";
import { Spotify } from "./spotify";

import type { Play, Track } from "./bowie";
import { getTracks, setTracks } from "./redis";

// TODO: temporary workaround until I can correct the data. Also, used in the main
// website and should be corrected there too.
// @see https://github.com/ihuntington/haveiplayedbowie/blob/main/app/src/routes/diary.js
const FALLBACK_TRACK_DURATION_MS = 1000 * 60 * 3;

// TODO: assign 15 to a global somewhere
const MINUTES_BETWEEN_EVENTS = 15;

type Event = {
	iso_date: string;
	date: Date;
	start_time: Date;
	end_time: Date;
	items: Play[];
}

function createEvent(item: Play): Event {
	const playedAt = parseISO(item.played_at);
	const isoDate = formatISO(playedAt);

	return {
		iso_date: isoDate,
		date: playedAt,
		items: [item],
		start_time: playedAt,
		end_time: addMilliseconds(playedAt, item.track.duration_ms || FALLBACK_TRACK_DURATION_MS),
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
	events: Map<string, Event> = new Map();

	constructor(username: string, startDate: string, endDate: string) {
		this.username = username;
		this.startDate = parseISO(startDate);
		this.endDate = endOfDay(parseISO(endDate || startDate));
	}

	async getEvents() {
		const plays = await CalendarWeek.bowie.getPlays(this.username, this.startDate, this.endDate);

		let currentDate:string;

		plays.items.forEach((item, index, arr) => {

			if (index === 0) {
				this.events.set(item.played_at, createEvent(item));

				currentDate = item.played_at;

				return;
			}

			const diff = getMinutesBetweenPlays(arr[index - 1], item);

			if (diff < MINUTES_BETWEEN_EVENTS) {
				const event = this.events.get(currentDate);

				if (event) {
					const playedAt = parseISO(item.played_at);

					this.events.set(currentDate, {
						...event,
						items: event.items.concat(item),
						end_time: addMilliseconds(playedAt, item.track.duration_ms)  || FALLBACK_TRACK_DURATION_MS,
					})

					return;
				}
			}

			this.events.set(item.played_at, createEvent(item));

			currentDate = item.played_at;
		});

		return this;
	}

	getCoverTracks() {
		const tracks: Track[] = [];

		this.events.forEach((event) => {
			tracks.push(event.items[0].track);
		});

		return tracks;
	}

	async getTracksFromSpotify() {
		const spotifyIds = this.getCoverTracks().map((t) => t.spotify_id);
		let cached = await getTracks(spotifyIds);

		if (cached) {
			return cached;
		}

		const data = await CalendarWeek.spotify.getTracks(spotifyIds);
		await setTracks(spotifyIds, JSON.stringify(data.tracks));

		return data.tracks;
	}
}

// const week = new CalendarWeek("ian", "2023-01-09", "2023-01-15")
// const events = await week.getEvents()
// const tracks = await week.getTracksFromSpotify()

