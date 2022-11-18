import {
  eachDayOfInterval,
  endOfISOWeek,
  endOfMonth,
  formatISO,
  getWeeksInMonth,
  startOfISOWeek,
  startOfMonth,
} from "date-fns";
import { container, example, page } from "./calendar.css";

import type { PropsWithChildren, ReactElement } from "react";

function DayCell({ date }: { date: Date }) {
  return (
    <div>
      <p>{formatISO(date, { representation: "date" })}</p>
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
  const date = new Date(2022, 3, 10);
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
      <div className={container}>
        {dates.map((d) => (
          <DayCell date={d} key={d.toISOString()} />
        ))}
      </div>
      <Block>
        <p>footer</p>
      </Block>
    </Page>
  );
}
