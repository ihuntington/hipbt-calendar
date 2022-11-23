import { useEffect, useState } from "react";
import {
	addDays,
	getDay,
	differenceInMinutes,
	eachHourOfInterval,
	format,
	startOfDay,
} from "date-fns";
import clsx from "clsx";
import { sprinkles as s} from "@/styles/sprinkles.css";
import * as styles from "./HourGrid.css";

function TimeMarker({
	date,
	highlight = false,
}: {
	date: Date;
	highlight?: boolean;
}) {
	const hour = format(date, "HH:mm");
	const dayIndex = getDay(date);
	return (
		<div
			className={clsx(styles.timeMarker, {
				[styles.highlight]: highlight,
			})}
		>
			<time className={styles.time}>{hour}</time>
			<span className={styles.line}></span>
			{highlight && <span className={styles.marker} style={{gridColumn: dayIndex + 1}}></span>}
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
	const delay = 1000;
	const [posY, setPosY] = useState<number>(getMarkerPosition(new Date()));
	const markerDate = new Date();

	useEffect(() => {
		let timeout = setTimeout(function tick() {
			const y = getMarkerPosition(new Date());
			if (y !== posY) {
				setPosY(y);
			}

			timeout = setTimeout(tick, delay);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [posY]);

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
			<TimeMarker date={markerDate} highlight />
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
		<>
			{hours.map((h) => {
				return (
					<div key={h.toISOString()} className={styles.row}>
						<TimeMarker date={h} />
					</div>
				);
			})}
			<CurrentTimeMarker />
		</>
	);
}
