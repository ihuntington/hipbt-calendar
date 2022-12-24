import { addMilliseconds, differenceInMinutes, endOfDay } from "date-fns";
import { formatISOWithOptions, parseISOWithOptions } from "date-fns/fp";
import { CalendarService, Play } from "../../services";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: temporary workaround until I can correct the data. Also, used in the main
// website and should be corrected there too.
// @see https://github.com/ihuntington/haveiplayedbowie/blob/main/app/src/routes/diary.js
const FALLBACK_TRACK_DURATION_MS = 1000 * 60 * 3;

const MINUTES_BETWEEN_EVENTS = 15;

const parseISO = parseISOWithOptions({ additionalDigits: 2 });
const formatISO = formatISOWithOptions({ representation: "date" });

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

export default async function week(req: NextApiRequest, res: NextApiResponse) {
	const { username, startDate, endDate } = req.query as { [K: string]: string };

	// TODO: replace this with validation library
	if (req.method === "GET" && (!startDate || !endDate)) {
		return res.status(400).json({ message: "`startDate` and `endDate` are required" });
	}

	const start = parseISO(startDate);
	const end = endOfDay(parseISO(endDate || startDate));

	const calendar = new CalendarService();
	const data = await calendar.getEvents(username, start, end);

	const result: { [K: string]: Event } = {};

	let currentDate: string = "";

	data.items.forEach((item, index, arr) => {
		const playedAt = parseISO(item.played_at);

		if (index === 0) {
			const event = createEvent(item);

			result[item.played_at] = event;

			currentDate = item.played_at;

			return;
		}

		const diff = getMinutesBetweenPlays(arr[index - 1], item);

		// TODO: assign 15 to a global somewhere
		if (diff < MINUTES_BETWEEN_EVENTS) {
			const events = result[currentDate];

			if (events) {
				result[currentDate] = {
					...events,
					items: [...events.items, item],
					end_time: addMilliseconds(playedAt, item.track.duration_ms || FALLBACK_TRACK_DURATION_MS),
				};

				return;
			}
		}

		result[item.played_at] = createEvent(item)

		currentDate = item.played_at;
	});

	res.status(200).json(result);
}
