import { format } from "date-fns";
import { useCalendarContext } from "../../context/CalendarContext";
import * as styles from "./MonthYearTitle.css";

export function MonthYearTitle() {
	const { date } = useCalendarContext();
	const month = format(date, "LLLL");
	const year = format(date, "yyyy");

	return (
		<div>
			<span className={styles.month}>{month}</span>
			<span className={styles.year}>{year}</span>
		</div>
	);
}
