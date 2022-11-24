import { eachDayOfInterval, endOfDay, formatISO, parseISO, startOfDay } from "date-fns";
import { zipObj } from "rambda";
import { CalendarService } from "../../services";

import type { NextApiRequest, NextApiResponse } from "next";

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
	const { username, startDate, endDate } = req.query as { [K: string]: string };

	// TODO: replace this with validation library
	if (req.method === "GET" && (!startDate || !endDate)) {
		return res.status(400).json({ message: "`startDate` and `endDate` are required" });
	}

	const start = startOfDay(parseISO(startDate));
	const end = endOfDay(parseISO(endDate || startDate));
	const range = eachDayOfInterval({
		start,
		end,
	}).map((d) => formatISO(d, { representation: "date" }));

	const cs = new CalendarService();
	const data = await Promise.all(range.map((date) => cs.getEventsByDate(date, username)));

	const filteredData = Object.entries(zipObj(range, data)).filter(([_, data]) => data.items.length);
	const events = filteredData.map(([date, { items }]) => {
		return {
			date,
			start_time: items[0].played_at,
			end_time: items[items.length - 1].played_at,
			items,
			total: items.length,
		}
	});

	res.status(200).json({ events: zipObj(events.map((e => e.date)), events) });
}
