import clsx from "clsx";
import {
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	format,
	isToday,
	getISOWeek,
	isSameWeek,
} from "date-fns";
import { useCalendarContext } from "../../context/CalendarContext";
import { HourGrid } from "../HourGrid";

import { sprinkles as s } from "@/styles/sprinkles.css";
import * as styles from "./WeekView.css";

export function WeekView() {
	const { date } = useCalendarContext();

	const weekCount = getISOWeek(date);
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
			<div className={styles.rowHeader}>
				<div className={clsx(styles.count)}>
					<span>{`W${weekCount}`}</span>
				</div>
				{dates.map((d) => {
					const day = format(d, "eee", { weekStartsOn: 1 });
					const date = format(d, "d");

					return (
						<div
							key={day}
							className={clsx(styles.colDay, {
								[styles.today]: isToday(d),
							})}
						>
							<span className={styles.day}>{day}</span>
							<span className={styles.date}>{date}</span>
						</div>
					);
				})}
			</div>
			<div className={styles.rowBodyWrapper}>
				<div className={s({ position: "relative" })}>
					<div>
						<HourGrid />
					</div>
					<div className={styles.bodyCols}>
						{dates.map((d, i, arr) => {
							if (i < arr.length - 1) {
								return (
									<span key={d.toISOString()} className={styles.separator} style={{ gridColumnStart: i + 3 }}></span>
								);
							}

							return null;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
