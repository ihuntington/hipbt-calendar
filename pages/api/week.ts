import { CalendarWeek } from "lib/calendar";
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

	const events = await week.getEvents();

	res.status(200).json(events);
}
