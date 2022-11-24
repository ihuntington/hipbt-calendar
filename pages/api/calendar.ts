import fetch from "node-fetch";
import qs from "query-string";
import { eachDayOfInterval, endOfDay, formatISO, parseISO, startOfDay } from "date-fns";

import type { NextApiRequest, NextApiResponse } from "next";

enum Service {
    SPOTIFY = "SPOTIFY",
}

type Artist = {
    id: number;
    name: string;
    spotify_id: string;
}

type Track = {
    id: number;
    name: string;
    spotify_id: string;
    duration_ms: number;
    artists: Artist[];
}

type Play = {
    id: number;
    played_at: string;
    source_service: Service;
    track: Track;
}

type CalendarSuccessResponse = {
    items: Play[];
    total: number;
}

type CalendarBadRequest = {
    message: string;
}

type CalendarResponse = CalendarSuccessResponse | CalendarBadRequest;

class CalendarService {
    private async request<T>(query: { [K: string]: string }): Promise<T> {
        const url = process.env.API_URL as string;
        const response = await fetch(`${url}/scrobbles?${qs.stringify(query)}`, {
            headers: {
                Authorization: process.env.API_AUTH as string,
            }
        });
        const data = await response.json() as T;
        return data;
    }

    async getEventsByDate(date: string, username: string) {
        return await this.request<CalendarSuccessResponse>({ date, username });
    }
}

export default async function calendar(req: NextApiRequest, res: NextApiResponse<CalendarResponse>) {
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

    const cs = new CalendarService();

    const data = await Promise.all(range.map((date) => {
        const formattedDate = formatISO(date, { representation: "date" });
        return cs.getEventsByDate(formattedDate, username);
    }));

    const dateRangeItems = data.flatMap((d) => d.items);

    res.status(200).json({
        items: dateRangeItems,
        total: dateRangeItems.length,
    });
}
