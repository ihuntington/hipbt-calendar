import clsx from "clsx";
import {
	differenceInMinutes,
	isSameDay,
	startOfDay,
} from "date-fns";
import formatWithOptions from "date-fns/fp/formatWithOptions";
import { assignInlineVars } from "@vanilla-extract/dynamic"
import { Play } from "lib/bowie";
import { sprinkles as s } from "@/styles/sprinkles.css";

import type { Image as AlbumImage } from "lib/spotify";

import * as styles from "./CalendarEvent.css"

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
	const weekDayIndex = getWeekDayIndex(startTime, dates);
	const posY = getStartTimeOffset(event) * MULTIPLIER;
	const height = getEndTimeOffset(event) * MULTIPLIER

	const handleClick = () => {
		console.log(event)
	};

	return (
		<div
			className={clsx(s({ position: "absolute" }), styles.container)}
			style={assignInlineVars({
				[styles.height]: `${height}px`,
				[styles.top]: `${posY}px`,
				[styles.gridColumn]: `${weekDayIndex}`
			})}
			onClick={handleClick}
		>
			<div className={styles.body}>
				<time
					dateTime={startTime.toLocaleString()}
					className={styles.time}
				>{`${formatTime(startTime)}`}</time>
				<p>{event.items[0].track.name}</p>
			</div>
		</div>
	);
}
