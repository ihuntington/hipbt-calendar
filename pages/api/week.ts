import { CalendarWeek } from "lib/calendar";
import { getLocalListenEvents } from "lib/localTracklist";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function week(req: NextApiRequest, res: NextApiResponse) {
	const { username, startDate, endDate } = req.query as {
		[K: string]: string;
	};

	// TODO: replace this with validation library
	if (req.method === "GET" && (!startDate || !endDate)) {
		return res.status(400).json({ message: "`startDate` and `endDate` are required" });
	}

	const week = new CalendarWeek(username, startDate, endDate);

	try {
		const events = await week.getEvents();
		return res.status(200).json(events);
	} catch (error) {
		// The upstream Have I Played Bowie API isn't always running; fall back
		// to any local BBC tracklist data available for the requested range.
		console.error("Failed to fetch events from Bowie API, falling back to local data:", error);
		const events = getLocalListenEvents(week.startDate, week.endDate);
		return res.status(200).json(events);
	}
}
