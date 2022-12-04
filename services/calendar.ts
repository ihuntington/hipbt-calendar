import { formatISO } from "date-fns";
import fetch from "node-fetch";
import qs from "query-string";

export enum Service {
    SPOTIFY = "SPOTIFY",
}

export type Artist = {
    id: number;
    name: string;
    spotify_id: string;
}

export type Track = {
    id: number;
    name: string;
    spotify_id: string;
    duration_ms: number;
    artists: Artist[];
}

export type Play = {
    id: number;
    played_at: string;
    source_service: Service;
    track: Track;
}

export type CalendarSuccessResponse = {
    items: Play[];
    total: number;
}

export type CalendarBadRequest = {
    message: string;
}

export type CalendarResponse = CalendarSuccessResponse | CalendarBadRequest;

export class CalendarService {
    private async request(query: { [K: string]: string }) {
        const url = process.env.API_URL as string;
        const response = await fetch(`${url}/scrobbles?${qs.stringify(query)}`, {
            headers: {
                Authorization: process.env.API_AUTH as string,
            }
        });
        return response.json();
    }

    async getEventsByDate(date: string, username: string) {
        return this.request({ date, username }) as Promise<CalendarSuccessResponse>;
    }

	async getEvents(username: string, startDate: Date, endDate: Date) {
		return this.request({
			startDate: formatISO(startDate, { representation: "date" }),
			endDate: formatISO(endDate, { representation: "date" }),
			username,
		}) as Promise<CalendarSuccessResponse>;
	}
}
