import { getDate } from "date-fns";
import styles from "./DayCell.module.css";

interface IDayCell {
	date: Date;
	selectedMonth: Date;
}

export function DayCell({ date, selectedMonth }: IDayCell) {
	return (
		<div>
			<div className={styles.cell}>
				<p>{getDate(date)}</p>
			</div>
		</div>
	);
}
