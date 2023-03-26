import { useEffect, useRef } from "react";
import { addDays, differenceInMinutes, eachHourOfInterval, startOfDay, isSameWeek } from "date-fns";
import { sprinkles as s } from "@/styles/sprinkles.css";
import { useCalendarContext } from "../../context/CalendarContext";
import { HourRow } from "./HourRow";

export function getMarkerPosition(date: Date) {
	const multiplier = 2;
	const dateStart = startOfDay(date);
	const diff = differenceInMinutes(date, dateStart);
	const yh = Math.floor(diff / 60) * 60 * multiplier;
	const ym = (diff % 60) * multiplier;
	// TODO: quick hack to correct posY of marker, 16px is the height of the element in the DOM
	return yh + ym - 16;
}

function CurrentTimeMarker() {
	const markerRef = useRef<HTMLDivElement>(null);
	const hasScrolledToMarker = useRef(false);
	const { date, time } = useCalendarContext();
	const posY = getMarkerPosition(time);
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
	const hours = eachHourOfInterval({
		start: startOfDay(date),
		end: addDays(date, 1),
	});

	return (
		<div data-layer="hour-grid">
			{hours.map((h, index, arr) => (
				<HourRow key={h.toISOString()} date={h} collapse={index === arr.length - 1} />
			))}
			<CurrentTimeMarker />
		</div>
	);
}
