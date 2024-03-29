import clsx from "clsx";
import { differenceInMinutes, isSameDay, startOfDay } from "date-fns";
import formatWithOptions from "date-fns/fp/formatWithOptions";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Play } from "lib/bowie";

import type { Image as AlbumImage } from "lib/spotify";

import {
	Popover,
	PopoverContent,
	PopoverPortal,
	PopoverTrigger,
} from "@/components/Popover/Popover";
import { EventPanel } from "@/components/EventPanel/EventPanel";
import { sprinkles as s } from "@/styles/sprinkles.css";
import * as styles from "./CalendarEvent.css";

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
	return differenceInMinutes(startTime, startOfDay(startTime));
}

function getEndTimeOffset(event: IEvent) {
	const startTime = new Date(event.start_time);
	const endTime = new Date(event.end_time);
	return differenceInMinutes(endTime, startTime);
}

export function CalendarEvent({ event, dates }: { event: IEvent; dates: Date[] }) {
	const startTime = new Date(event.start_time);
	const weekDayIndex = getWeekDayIndex(startTime, dates);
	const posY = getStartTimeOffset(event) * MULTIPLIER;
	const height = getEndTimeOffset(event) * MULTIPLIER;

	const handleClick = () => {
		console.log(event);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					className={clsx(s({ position: "absolute" }), styles.container)}
					style={assignInlineVars({
						[styles.height]: `${height}px`,
						[styles.top]: `${posY}px`,
						[styles.gridColumn]: `${weekDayIndex}`,
					})}
					onClick={handleClick}
				>
					<div
						className={clsx(
							s({ overflowX: "hidden", overflowY: "hidden" }),
							styles.body
						)}
					>
						<time
							dateTime={startTime.toLocaleString()}
							className={styles.time}
						>{`${formatTime(startTime)}`}</time>
						<p className={clsx(s({ fontSize: "md", fontWeight: 700 }), styles.title)}>
							{event.items[0].track.name}
						</p>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<EventPanel event={event} />
			</PopoverContent>
			<PopoverPortal />
		</Popover>
	);
}
