import { useQuery } from "@tanstack/react-query";
import { formatISOWithOptions } from "date-fns/fp";
import qs from "query-string";
import clsx from "clsx";
import { useCalendarContext } from "../../context/CalendarContext";
import { Play } from "@/services/calendar";
import { sprinkles as s } from "@/styles/sprinkles.css";
import {
	addDays,
	addMilliseconds,
	addMinutes,
	differenceInMinutes,
	eachDayOfInterval,
	format as f,
	isSameDay,
	parseISO,
	startOfDay,
} from "date-fns";
import { WeekGrid } from "../WeekGrid";

const format = formatISOWithOptions({ representation: "date" });


// TODO: revert back to being an array of events because if there are more than
// one event on the same day this current approach will not work. Or group events by day.
type IEvents = Record<string, IEvent>;

interface IEvent {
	iso_date: string;
	date: string;
	start_time: string;
	end_time: string;
	items: Play[];
	total: number;
}

export function CalendarEvent({ event, dates }: { event: IEvent; dates: Date[] }) {
	const eventDate = startOfDay(parseISO(event.iso_date));
	const weekDayIndex = dates.findIndex((d) => isSameDay(d, eventDate));

	const multiplier = 2;
	const startTime = new Date(event.start_time);

	const eventStartOffset = differenceInMinutes(startTime, startOfDay(startTime));
	const yh = Math.floor(eventStartOffset / 60) * 60 * multiplier;
	const ym = (eventStartOffset % 60) * multiplier;
	const posY = yh + ym;

	const ms = event.items.reduce((prev, current) => {
		return prev + current.track.duration_ms;
	}, 0);

	const eventEndOffset = differenceInMinutes(
		addMilliseconds(startTime, ms),
		startTime
	);
	const hh = Math.floor(eventEndOffset / 60) * 60 * multiplier;
	const hm = (eventEndOffset % 60) * multiplier;
	const height = Math.ceil(hh + hm);

	const handleClick = () => {
		console.log(event)
	};

	return (
		<div
			className={clsx(s({ position: "absolute" }))}
			style={{
				top: `${posY}px`,
				height: `max(${height}px, ${15 * multiplier}px)`,
				lineHeight: 1,
				background: "pink",
				width: "100%",
				gridRowStart: 1,
				gridColumnStart: weekDayIndex + 2,
				gridColumnEnd: weekDayIndex + 2
			}}
			onClick={handleClick}
		>
			{`${f(startTime, "H:mm")} - ${f(addMinutes(startTime, eventEndOffset), "H:mm")}`}
		</div>
	);
}

export function WeekBody() {
	const { weekStart, weekEnd } = useCalendarContext();
	const ws = format(weekStart)
	const we = format(addDays(weekEnd, 1))
	const { data, isLoading, isError } = useQuery({
		queryKey: ["week", ws, we],
		queryFn: async () => {
			const query = qs.stringify({
				username: "ian",
				startDate: ws,
				endDate: we,
			});
			const response = await fetch(`/api/week?${query}`);
			if (!response.ok) {
				throw new Error("Could not fetch events for week")
			}
			return response.json() as Promise<IEvents>;
		},
		initialData: {}
	})

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