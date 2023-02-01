import { addDays, differenceInMinutes, eachHourOfInterval, startOfDay, isSameWeek } from "date-fns";
import { sprinkles as s } from "@/styles/sprinkles.css";
import { useCalendarContext } from "../../context/CalendarContext";
import { HourRow } from "./HourRow";

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
