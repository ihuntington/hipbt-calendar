import clsx from "clsx";
import { eachDayOfInterval, endOfWeek, format, getISOWeek, isToday, startOfWeek } from "date-fns";
import { useCalendarContext } from "../../context/CalendarContext";
import * as styles from "./WeekHeader.css";

export function WeekHeader() {
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
		<div className={styles.weekHeader}>
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
	)
}
