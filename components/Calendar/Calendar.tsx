import {
  getWeeksInMonth,
  startOfISOWeek,
  startOfMonth,
  endOfISOWeek,
  endOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  formatISO,
  getWeek,
} from "date-fns";
import { calendar, calendarView, weekNumber, weeksOfYear } from "./calendar.css";

function DayCell({ date }: { date: Date }) {
  return (
    <div>
      <p>{formatISO(date, { representation: "date" })}</p>
    </div>
  );
}

function WeekOfYear({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const weeks = eachWeekOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <div className={weeksOfYear}>
      {weeks.map((w) => {
        const weekNum = getWeek(w, {
          weekStartsOn: 1,
        });
        return (
          <p className={weekNumber} key={weekNum}>
            {weekNum}
          </p>
        );
      })}
    </div>
  );
}

export function CalendarView() {
  const date = new Date(2022, 0, 1);
  const weeksInMonth = getWeeksInMonth(date);
  const startDate = startOfISOWeek(startOfMonth(date));
  const endDate = endOfISOWeek(endOfMonth(date));
  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <div className={calendarView}>
      <WeekOfYear startDate={startDate} endDate={endDate} />
      <div className={calendar}>
        {dates.map((d) => (
          <DayCell date={d} key={d.toISOString()} />
        ))}
      </div>
    </div>
  );
}
