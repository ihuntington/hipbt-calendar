import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import { daysOfWeek, dayOfWeek } from "./DaysOfWeek.css";

export function DaysOfWeek({ date }: { date: Date }) {
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
		<div className={daysOfWeek}>
			{dates.map((d) => {
				return (
					<div key={d.toISOString()} className={dayOfWeek}>
						{format(d, "eee", { weekStartsOn: 1 })}
					</div>
				);
			})}
		</div>
	);
}
