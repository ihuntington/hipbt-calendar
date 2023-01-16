import { eachDayOfInterval, endOfDay, formatISO, parseISO, startOfDay } from "date-fns";
import { Bowie } from "lib/bowie";

import type { NextApiRequest, NextApiResponse } from "next";
import type { PlaysResponse } from "lib/bowie";

export default async function calendar(req: NextApiRequest, res: NextApiResponse<PlaysResponse>) {
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
    });

    const cs = new Bowie();

    const data = await Promise.all(range.map((date) => {
        const formattedDate = formatISO(date, { representation: "date" });
        return cs.getPlaysByDate(formattedDate, username);
    }));

    const dateRangeItems = data.flatMap((d) => d.items);

    res.status(200).json({
        items: dateRangeItems,
        total: dateRangeItems.length,
    });
}
