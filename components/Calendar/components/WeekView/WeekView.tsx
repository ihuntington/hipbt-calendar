import clsx from "clsx";
import {
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	isSameWeek,
	startOfDay,
} from "date-fns";
import { useCalendarContext } from "../../context/CalendarContext";
import { HourGrid } from "../HourGrid/HourGrid";

import { WeekBody } from "../WeekBody";
import { WeekDayCols } from "./WeekDayCols";
import { WeekHeader } from "../WeekHeader";
import { sprinkles as s } from "@/styles/sprinkles.css";
import * as styles from "./WeekView.css";

export function WeekView() {
	const { date } = useCalendarContext();

	const weekStart = startOfWeek(date, {
		weekStartsOn: 1,
	});
	const weekEnd = endOfWeek(date, {
		weekStartsOn: 1,
	});
	const dates = eachDayOfInterval({
		start: weekStart,
		end: weekEnd,
	});

	return (
		<div
			className={clsx(styles.wrapper, {
				[styles.currentWeek]: isSameWeek(new Date(), date),
			})}
		>
			<WeekHeader />
			<div className={styles.rowBodyWrapper}>
				<div className={s({ position: "relative" })}>
					<HourGrid date={startOfDay(new Date())} />
					<WeekDayCols dates={dates} />
					<WeekBody />
				</div>
			</div>
		</div>
	);
}
