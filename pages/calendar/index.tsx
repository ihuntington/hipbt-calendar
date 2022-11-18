import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfISOWeek,
  endOfMonth,
  formatISO,
  getWeek,
  getWeeksInMonth,
  startOfISOWeek,
  startOfMonth,
} from "date-fns";
import {
  calendar,
  calendarView,
  example,
  page,
  weekNumber,
  weeksOfYear,
} from "./calendar.css";

import type { PropsWithChildren, ReactElement } from "react";

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

function Page({ children }: PropsWithChildren): ReactElement {
  return <div className={page}>{children}</div>;
}

function Block({ children }: PropsWithChildren) {
  return <div className={example}>{children}</div>;
}

export default function Calendar() {
  const date = new Date(2022, 0, 1);
  const weeksInMonth = getWeeksInMonth(date);
  const startDate = startOfISOWeek(startOfMonth(date));
  const endDate = endOfISOWeek(endOfMonth(date));
  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <Page>
      <Block>
        <p>header</p>
      </Block>
      <div className={calendarView}>
        <WeekOfYear startDate={startDate} endDate={endDate} />
        <div className={calendar}>
          {dates.map((d) => (
            <DayCell date={d} key={d.toISOString()} />
          ))}
        </div>
      </div>
      <Block>
        <p>footer</p>
      </Block>
    </Page>
  );
}
