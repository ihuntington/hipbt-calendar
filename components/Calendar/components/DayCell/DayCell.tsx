import { getDate, isSameMonth, isToday } from "date-fns";
import { dayVariant, selected } from "./DayCell.css";

interface IDayCell {
  date: Date;
  selectedMonth: Date;
}

export function DayCell({ date, selectedMonth }: IDayCell) {
  const variant = isSameMonth(date, selectedMonth);

  return (
    <div className={`${dayVariant[variant ? "inMonth" : "outMonth"]} ${isToday(date) ? selected["selected"] : selected["base"]}`}>
      <p>{getDate(date)}</p>
    </div>
  );
}
