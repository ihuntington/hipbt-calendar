import { formatISOWithOptions } from "date-fns/fp";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useCalendarContext } from "../../context/CalendarContext";
import { Play } from "@/services/calendar";
import clsx from "clsx";
import { sprinkles as s } from "@/styles/sprinkles.css";
import {
	addMilliseconds,
	addMinutes,
	differenceInMinutes,
	startOfDay,
} from "date-fns";

const format = formatISOWithOptions({ representation: "date" });

// TODO: revert back to being an array of events because if there are more than
// one event on the same day this current approach will not work. Or group events by day.
type IEvents = Record<string, IEvent>;

interface IEvent {
	date: string;
	start_time: string;
	end_time: string;
	items: Play[];
	total: number;
}

export function CalendarEvent({ event }: { event: IEvent }) {
	const multiplier = 2;
	const dateStart = startOfDay(new Date(event.start_time));
	const diff = differenceInMinutes(new Date(event.start_time), dateStart);
	const yh = Math.floor(diff / 60) * 60 * multiplier;
	const ym = (diff % 60) * multiplier;
	const posY = yh + ym;

	const ms = event.items.reduce((prev, current) => {
		return prev + current.track.duration_ms;
	}, 0);
	console.log({ ms: ms / 1000 });
	const startTime = new Date(event.start_time);
	const endDiff = differenceInMinutes(
		addMilliseconds(startTime, ms),
		startTime
	);
	const hh = Math.floor(endDiff / 60) * 60 * multiplier;
	const hm = (endDiff % 60) * multiplier;
	const height = Math.ceil(hh + hm);
	console.log({ endDiff, hh, hm, height });

	return (
		<div
			className={clsx(s({ position: "absolute" }))}
			style={{
				top: `${posY}px`,
				height: `max(${height}px, ${15 * multiplier}px)`,
				lineHeight: 1,
				background: "pink",
				width: "100%",
			}}
		>
			Some listening here
		</div>
	);
}

export function WeekBody({ dates }: { dates: Date[] }) {
	const { weekStart, weekEnd } = useCalendarContext();
	const [state, setState] = useState<IEvents>({});

	// TODO: move out of component and replace with TanQuery or some other state
	// management solution
	useEffect(() => {
		const getEvents = async () => {
			const startDate = format(weekStart);
			const endDate = format(weekEnd);
			const query = qs.stringify({
				username: "ian",
				startDate,
				endDate,
			});
			const response = await fetch(`/api/week?${query}`);
			const data = (await response.json()) as { events: IEvents };

			setState(data.events);
		};

		getEvents();
	}, [weekStart, weekEnd]);

	return (
		<>
			{dates.map((d, i) => {
				const date = format(d);
				const event = state[date];
				return (
					<div
						key={d.toISOString()}
						className={s({ position: "relative" })}
						style={{ gridColumnStart: i + 2 }}
					>
						{event ? <CalendarEvent event={event} /> : null}
					</div>
				);
			})}
		</>
	);
}
