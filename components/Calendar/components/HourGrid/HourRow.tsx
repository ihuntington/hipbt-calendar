import clsx from "clsx";
import { format, getISODay } from "date-fns";
import * as styles from "./HowRow.css";

export function HourRow({
	collapse = false,
	date,
	highlight = false,
}: {
	collapse?: boolean;
	date: Date;
	highlight?: boolean;
}) {
	const hour = format(date, "HH:mm");
	const dayIndex = getISODay(date);

	return (
		<div
			className={clsx(styles.row, {
				[styles.highlight]: highlight,
				[styles.collapse]: collapse,
			})}
		>
			<time className={styles.time}>{hour}</time>
			<span className={styles.line}></span>
			{highlight && (
				<span
					data-iso-day={dayIndex}
					className={styles.marker}
					style={{ gridColumn: dayIndex + 1 }}
				></span>
			)}
		</div>
	);
}
