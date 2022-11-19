import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	eachWeekOfInterval,
	format,
	startOfWeek,
	endOfWeek,
	getISOWeek,
} from "date-fns";
import { DayCell, DaysOfWeek } from "./components";
import {
	calendar,
	calendarView,
	weekNumber,
	weeksOfYear,
} from "./calendar.css";

function WeekOfYear({
	startDate,
	endDate,
}: {
	startDate: Date;
	endDate: Date;
}) {
	const weeks = eachWeekOfInterval(
		{
			start: startDate,
			end: endDate,
		},
		{
			weekStartsOn: 1,
		}
	);

	return (
		<div className={weeksOfYear}>
			{weeks.map((w) => {
				const weekNum = getISOWeek(w);
				return (
					<p className={weekNumber} key={weekNum}>
						{weekNum}
					</p>
				);
			})}
		</div>
	);
}

export function CalendarView({ date }: { date: Date }) {
	const startDate = startOfWeek(startOfMonth(date), {
		weekStartsOn: 1,
	});
	const endDate = endOfWeek(endOfMonth(date), {
		weekStartsOn: 1,
	});
	const dates = eachDayOfInterval({
		start: startDate,
		end: endDate,
	});

	return (
		<div className={calendarView}>
			<DaysOfWeek date={date} />
			<WeekOfYear startDate={startDate} endDate={endDate} />
			<div className={calendar}>
				{dates.map((d) => (
					<DayCell
						date={d}
						key={d.toISOString()}
						selectedMonth={startOfMonth(date)}
					/>
				))}
			</div>
		</div>
	);
}
