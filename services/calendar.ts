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
