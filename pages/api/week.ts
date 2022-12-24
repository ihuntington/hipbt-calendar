import { addMilliseconds, differenceInMinutes, eachDayOfInterval, endOfDay, formatISO, isSameDay } from "date-fns";
import { zipObj, compose, pipe } from "rambda";
import { CalendarService, Play } from "../../services";

import type { NextApiRequest, NextApiResponse } from "next";
import { formatISOWithOptions, parseISOWithOptions, startOfDay } from "date-fns/fp";

// TODO: temporary workaround until I can correct the data. Also, used in the main
// website and should be corrected there too.
// @see https://github.com/ihuntington/haveiplayedbowie/blob/main/app/src/routes/diary.js
const FALLBACK_TRACK_DURATION_MS = 1000 * 60 * 3;

type Plays = Play[];
type Events = Plays[];

// type EventsGroup = Record<string, Events>;
type EventsGroup = { [K: string]: Plays[] };

type Event = {
	iso_date: string;
	date: Date;
	start_time: Date;
	end_time: Date;
	items: Play[];
}

// function (current: Date, previous: Date, ms = 0) {
// 	return Math.abs(differenceInMinutes(previous, current)) > 15;
// }

// TODO: Refactor function as somewhat messy
// Return an array of elevents grouped by day rather than object by day
/* Example:
{
	events: {
		"2022-01-01": [
			{
				date: "2022-01-01T00:00:00z",
				items: [],
				startTime: a
				endTime: b
			},
			{
				date: "2022-01-01T01:00:00z"
				items: [],
				startTime: c
				endTime: d
			}
		]
	}
}
 */
export default async function week(req: NextApiRequest, res: NextApiResponse) {
	const parseISO = parseISOWithOptions({ additionalDigits: 2 });
	const formatISO = formatISOWithOptions({ representation: "date" });

	const { username, startDate, endDate } = req.query as { [K: string]: string };

	// TODO: replace this with validation library
	if (req.method === "GET" && (!startDate || !endDate)) {
		return res.status(400).json({ message: "`startDate` and `endDate` are required" });
	}

	const start = parseISO(startDate);
	const end = endOfDay(parseISO(endDate || startDate));

	const cs = new CalendarService();
	const data = await cs.getEvents(username, start, end);

	const result: { [K: string]: Event } = {};

	let currentDate: string = "";

	data.items.forEach((item, index, arr) => {
		const playedAt = parseISO(item.played_at);
		const isoDate = formatISO(playedAt);

		if (index === 0) {
			result[item.played_at] = {
				iso_date: isoDate,
				date: playedAt,
				items: [item],
				start_time: playedAt,
				end_time: addMilliseconds(playedAt, item.track.duration_ms || FALLBACK_TRACK_DURATION_MS),
			};
			currentDate = item.played_at;

			return;
		}

		const previous = arr[index - 1];
		const previousStartTime = parseISO(previous.played_at);
		const previousEndTime = addMilliseconds(previousStartTime, previous.track.duration_ms || FALLBACK_TRACK_DURATION_MS);
		const diff = Math.abs(differenceInMinutes(previousEndTime, playedAt));

		// TODO: assign 15 to a global somewhere
		if (diff < 15) {
			const r = result[currentDate];

			if (r) {
				result[currentDate] = {
					...r,
					items: [...r.items, item],
					end_time: addMilliseconds(playedAt, item.track.duration_ms || FALLBACK_TRACK_DURATION_MS),
				};
				return;
			}
		}

		result[item.played_at] = {
			iso_date: isoDate,
			date: playedAt,
			items: [item],
			start_time: playedAt,
			end_time: addMilliseconds(parseISO(item.played_at), item.track.duration_ms || FALLBACK_TRACK_DURATION_MS),
		};
		currentDate = item.played_at;
	});

	res.status(200).json(result);
}
