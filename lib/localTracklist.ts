import { existsSync, readFileSync } from "fs";
import path from "path";
import { addMilliseconds, eachDayOfInterval, formatISO, set } from "date-fns";
import { Service } from "./bowie";

import type { Artist, BowieTrack, Play } from "./bowie";
import type { ListenEvent } from "./calendar";

// Matches the fallback duration used in lib/calendar.ts for plays with no
// known length; local tracklists don't carry per-track durations either.
const TRACK_DURATION_MS = 1000 * 60 * 3;

// Lauren Laverne's BBC Radio 6 Music show airs late-morning. The exact start
// time isn't available from the source data, so this is only an
// approximation used to position tracks on the calendar grid.
const SHOW_START_HOUR = 10;

type LocalTrack = {
	position: number;
	artist: string;
	title: string;
	session: string | null;
};

type LocalTracklist = {
	date: string;
	network: string;
	programme: string;
	tracks: LocalTrack[];
};

const DATA_DIR = path.join(process.cwd(), "data", "bbc-radio-6-music");

function loadTracklist(date: string): LocalTracklist | null {
	const file = path.join(DATA_DIR, `lauren-laverne-${date}.json`);

	if (!existsSync(file)) {
		return null;
	}

	return JSON.parse(readFileSync(file, "utf8"));
}

function toPlay(track: LocalTrack, playedAt: Date): Play {
	const artist: Artist = {
		id: track.position,
		name: track.artist,
		spotify_id: "",
	};

	const bowieTrack: BowieTrack = {
		id: track.position,
		name: track.title,
		spotify_id: "",
		duration_ms: TRACK_DURATION_MS,
		artists: [artist],
	};

	return {
		id: track.position,
		played_at: playedAt.toISOString(),
		source_service: Service.BBC,
		track: bowieTrack,
	};
}

function buildListenEvent(day: Date, tracklist: LocalTracklist): ListenEvent {
	const showStart = set(day, { hours: SHOW_START_HOUR, minutes: 0, seconds: 0, milliseconds: 0 });

	let cursor = showStart;
	const items: Play[] = tracklist.tracks.map((track) => {
		const playedAt = addMilliseconds(cursor, TRACK_DURATION_MS);
		const play = toPlay(track, playedAt);
		cursor = playedAt;
		return play;
	});

	return {
		start_time: showStart,
		end_time: cursor,
		items,
		images: [],
	};
}

/**
 * Fallback data used when the live Bowie API is unreachable. Only days with
 * a matching data/bbc-radio-6-music/lauren-laverne-<date>.json file produce
 * an event; the rest of the requested range is simply skipped.
 */
export function getLocalListenEvents(startDate: Date, endDate: Date): ListenEvent[] {
	const days = eachDayOfInterval({ start: startDate, end: endDate });

	return days.reduce<ListenEvent[]>((events, day) => {
		const tracklist = loadTracklist(formatISO(day, { representation: "date" }));

		if (!tracklist || tracklist.tracks.length === 0) {
			return events;
		}

		events.push(buildListenEvent(day, tracklist));

		return events;
	}, []);
}
