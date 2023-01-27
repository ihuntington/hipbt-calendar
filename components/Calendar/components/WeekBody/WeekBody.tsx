import { useQuery } from "@tanstack/react-query";
import qs from "query-string";
import {
	addDays,
	eachDayOfInterval,
	formatISO,
} from "date-fns";
import { useCalendarContext } from "../../context/CalendarContext";
import { WeekGrid } from "../WeekGrid";
import { IEvent, CalendarEvent} from "../CalendarEvent/CalendarEvent"

// TODO: revert back to being an array of events because if there are more than
// one event on the same day this current approach will not work. Or group events by day.
type IEvents = Record<string, IEvent>;

function formatDate(date: Date) {
	return formatISO(date, { representation: "date" });
}

async function fetchWeek(username: string, weekStart: Date, weekEnd: Date) {
	const query = qs.stringify({
		username,
		startDate: formatDate(weekStart),
		endDate: formatDate(weekEnd),
	});
	const response = await fetch(`/api/week?${query}`);

	if (!response.ok) {
		throw new Error("Could not fetch events for week")
	}

	return response.json() as Promise<IEvents>;
}

export function WeekBody() {
	const { weekStart, weekEnd } = useCalendarContext();
	// TODO: long-term solution should be implemented in API for inclusive range
	const inclusiveWeekEnd = addDays(weekEnd, 1);
	const { data, isLoading, isError } = useQuery({
		queryKey: ["week", formatDate(weekStart), formatDate(inclusiveWeekEnd)],
		queryFn: () => fetchWeek("ian", weekStart, inclusiveWeekEnd),
		initialData: {}
	});

	// TODO: handle the error
	if (isLoading || isError) {
		return null;
	}

	const dates = eachDayOfInterval({
		start: weekStart,
		end: weekEnd,
	});

	return (
		<WeekGrid>
			{Object.values(data).map((item) => <CalendarEvent key={item.start_time} event={item} dates={dates} />)}
		</WeekGrid>
	);
}
