import {
	addDays,
	getDay,
	differenceInMinutes,
	eachHourOfInterval,
	format,
	startOfDay,
	isSameWeek,
} from "date-fns";
import clsx from "clsx";
import { sprinkles as s} from "@/styles/sprinkles.css";
import * as styles from "./HourGrid.css";
import { useCalendarContext } from "../../context/CalendarContext";

function TimeMarker({
	collapse = false,
	date,
	highlight = false,
}: {
	collapse?: boolean;
	date: Date;
	highlight?: boolean;
}) {
	const hour = format(date, "HH:mm");
	// TODO: highlight marker is appearing in wrong column
	const dayIndex = getDay(date);
	return (
		<div
			className={clsx(styles.row, {
				[styles.highlight]: highlight,
				[styles.collapse]: collapse,
			})}
		>
			<time className={styles.time}>{hour}</time>
			<span className={styles.line}></span>
			{highlight && <span className={styles.marker} style={{ gridColumn: dayIndex + 2 }}></span>}
		</div>
	);
}

function getMarkerPosition(date: Date) {
	const multiplier = 2;
	const dateStart = startOfDay(date);
	const diff = differenceInMinutes(date, dateStart);
	const yh = Math.floor(diff / 60) * 60 * multiplier;
	const ym = (diff % 60) * multiplier;
	return yh + ym;
}

function CurrentTimeMarker() {
	const { date, time } = useCalendarContext();
	const posY = getMarkerPosition(time);

	if (!isSameWeek(date, time)) {
		return null;
	}

	return (
		<div
			className={s({ position: "absolute" })}
			style={{
				top: `${posY}px`,
				left: "0px",
				right: "0px",
				zIndex: 2,
			}}
		>
			<TimeMarker date={time} highlight />
		</div>
	);
}

export function HourGrid() {
	// Hard code a date to generate a grid of hours for the day does not need to
	// consume state at the moment
	const date = startOfDay(new Date());
	const hours = eachHourOfInterval({
		start: date,
		end: addDays(date, 1),
	});

	return (
		<div data-layer="hour-grid">
			{hours.map((h, index, arr) => <TimeMarker key={h.toISOString()} date={h} collapse={index === arr.length - 1} />)}
			<CurrentTimeMarker />
		</div>
	);
}
