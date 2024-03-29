import { useEffect, useRef } from "react";
import { addDays, differenceInMinutes, eachHourOfInterval, startOfDay, isSameWeek } from "date-fns";
import { sprinkles as s } from "@/styles/sprinkles.css";
import { useCalendarContext } from "../../context/CalendarContext";
import { HourRow } from "./HourRow";
import * as styles from "./HourGrid.css";

const multiplier = 2;

export function getMarkerPosition(date: Date) {
	return differenceInMinutes(date, startOfDay(date));
}

function CurrentTimeMarker() {
	const markerRef = useRef<HTMLDivElement>(null);
	const hasScrolledToMarker = useRef(false);
	const { date, time } = useCalendarContext();
	const posY = getMarkerPosition(time) * multiplier;
	const showMarker = isSameWeek(date, time);

	useEffect(() => {
		if (showMarker && markerRef.current && !hasScrolledToMarker.current) {
			window.scrollTo({
				behavior: "auto",
				left: 0,
				top: markerRef.current.offsetTop - window.innerHeight / 2,
			});
			hasScrolledToMarker.current = true;
		}
	}, [showMarker]);

	if (!showMarker) {
		hasScrolledToMarker.current = false;

		return null;
	}

	return (
		<div
			ref={markerRef}
			className={s({ position: "absolute" })}
			style={{
				top: `${posY}px`,
				left: "0px",
				right: "0px",
				zIndex: 2,
			}}
		>
			<HourRow date={time} highlight />
		</div>
	);
}

export function HourGrid({ date }: { date: Date }) {
	const dayStart = startOfDay(date);
	const hours = eachHourOfInterval({
		start: dayStart,
		end: addDays(dayStart, 1),
	});

	return (
		<div className={styles.grid}>
			{hours.map((h, index, arr) => (
				<HourRow key={h.toISOString()} date={h} collapse={index === arr.length - 1} />
			))}
			<CurrentTimeMarker />
		</div>
	);
}
