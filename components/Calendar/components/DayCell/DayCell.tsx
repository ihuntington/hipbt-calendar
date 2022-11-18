import { formatISO, isSameMonth } from "date-fns";
import { dayVariant } from "./DayCell.css";

interface IDayCell {
  date: Date;
  selectedMonth: Date;
}

export function DayCell({ date, selectedMonth }: IDayCell) {
  const variant = isSameMonth(date, selectedMonth);
  return (
    <div className={dayVariant[variant ? "inMonth" : "outMonth"]}>
      <p>{formatISO(date, { representation: "date" })}</p>
    </div>
  );
}
