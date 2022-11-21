import { getDate, isSameMonth, isToday } from "date-fns";
import clsx from "clsx";
import styles from "./DayCell.module.css";
// import * as styles from "./DayCell.css";

interface IDayCell {
	date: Date;
	selectedMonth: Date;
}

export function DayCell({ date, selectedMonth }: IDayCell) {
	const inMonth = isSameMonth(date, selectedMonth);

	return (
		<div>
			<div className={styles.cell}>
				<p>{getDate(date)}</p>
			</div>
		</div>
	);
}
