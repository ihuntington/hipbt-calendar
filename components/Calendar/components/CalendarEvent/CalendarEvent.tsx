import clsx from "clsx";
import {
	differenceInMinutes,
	isSameDay,
	parseISO,
	startOfDay,
} from "date-fns";
import formatWithOptions from "date-fns/fp/formatWithOptions";
import { Play } from "lib/bowie";
import { sprinkles as s } from "@/styles/sprinkles.css";

import type { Image as AlbumImage } from "lib/spotify";

export interface IEvent {
	iso_date: string;
	date: string;
	start_time: string;
	end_time: string;
	items: Play[];
	total: number;
	images: AlbumImage[];
}

const MULTIPLIER = 2;

const MIN_EVENT_HEIGHT = 15 * MULTIPLIER;

const formatTime = formatWithOptions({}, "H:mm");

function getWeekDayIndex(eventDate: Date, dates: Date[]) {
	return dates.findIndex((d) => isSameDay(d, startOfDay(eventDate)));
}

function getStartTimeOffset(event: IEvent) {
	const startTime = new Date(event.start_time);
	const minutes = differenceInMinutes(startTime, startOfDay(startTime));
	const hoursOffset = Math.floor(minutes / 60) * 60;
	const minutesOffset = (minutes % 60);

	return hoursOffset + minutesOffset;
}

function getEndTimeOffset(event: IEvent) {
	const startTime = new Date(event.start_time)
	const endTime = new Date(event.end_time)
	const durationInMins = differenceInMinutes(endTime, startTime)

	const hoursOffset = Math.floor(durationInMins / 60) * 60;
	const minutesOffset = durationInMins % 60;

	return Math.ceil(hoursOffset + minutesOffset);
}

export function CalendarEvent({ event, dates }: { event: IEvent; dates: Date[] }) {
	const startTime = new Date(event.start_time);
	const endTime = new Date(event.end_time);
	const weekDayIndex = getWeekDayIndex(parseISO(event.iso_date), dates);
	const posY = getStartTimeOffset(event) * MULTIPLIER;
	const height = getEndTimeOffset(event) * MULTIPLIER

	const handleClick = () => {
		console.log(event)
	};

	return (
		<div
			className={clsx(s({ position: "absolute" }))}
			style={{
				top: `${posY}px`,
				height: `max(${height}px, ${MIN_EVENT_HEIGHT}px)`,
				lineHeight: 1,
				background: "pink",
				width: "100%",
				gridRowStart: 1,
				gridColumnStart: weekDayIndex + 2,
				gridColumnEnd: weekDayIndex + 2
			}}
			onClick={handleClick}
		>
			<div>
				{`${formatTime(startTime)} - ${formatTime(endTime)}`}
				<p>{event.items[0].track.name}</p>
			</div>
		</div>
	);
}
