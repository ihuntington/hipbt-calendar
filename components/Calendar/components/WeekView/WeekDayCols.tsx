import { WeekGrid } from "../WeekGrid";
import * as styles from "./WeekDayCols.css";

export function WeekDayCols({ dates }: { dates: Date[] }) {
	return (
		<WeekGrid>
			{dates.map((d, i, arr) => {
				if (i < arr.length - 1) {
					return (
						<span
							key={d.toISOString()}
							className={styles.separator}
							style={{ gridColumnStart: i + 3 }}
						></span>
					);
				}

				return null;
			})}
		</WeekGrid>
	);
}
