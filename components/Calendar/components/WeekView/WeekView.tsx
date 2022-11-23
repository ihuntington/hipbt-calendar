import clsx from "clsx";
import {
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	format,
	isToday,
	getISOWeek,
	isSameWeek,
	eachHourOfInterval,
	startOfDay,
	addDays,
} from "date-fns";
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
	const hours = eachHourOfInterval({
		start: startOfDay(date),
		end: addDays(date, 1),
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
			<div className={styles.overflow}>
				<div className={styles.weekView}>
					<div className={clsx(styles.weekViewBody)}>
						{hours.map((h) => {
							const hour = format(h, "HH:mm");
							return (
								<div
									key={h.toISOString()}
									className={styles.hourRow}
								>
									<div className={styles.timeLine}>
										<time className={styles.time}>
											{hour}
										</time>
										<span className={styles.line}></span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
