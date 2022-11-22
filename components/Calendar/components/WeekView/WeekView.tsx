import clsx from "clsx";
import { startOfWeek, endOfWeek, eachDayOfInterval, formatISO, format, isToday, getISOWeek } from "date-fns";
import { useCalendarContext } from "../../context/CalendarContext";
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
		<div className={styles.weekView}>
			<div className={styles.rowHeader}>
				<div className={clsx(styles.count)}>
					<span>{`W${weekCount}`}</span>
				</div>
				{dates.map((d) => {
					const day = format(d, "eee", { weekStartsOn: 1 });
					const date = format(d, "d")

					return (
						<div key={day} className={clsx(styles.col, { [styles.today]: isToday(d) })}>
							<span className={styles.day}>{day}</span>
							<span className={styles.date}>{date}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
