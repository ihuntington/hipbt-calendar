import { addMonths, format, subMonths } from "date-fns";
import { Button } from "../../../Button";
import { useCalendarActionContext, useCalendarContext } from "../../context/CalendarContext";
import { container } from "./MonthNav.css";

export function MonthNav() {
	const { date } = useCalendarContext();
	const actions = useCalendarActionContext();

	const previousMonthHandler = (event: React.FormEvent<HTMLButtonElement>) => {
		actions?.setDate(subMonths(date, 1));
	};

	const nextMonthHandler = (event: React.FormEvent<HTMLButtonElement>) => {
		actions?.setDate(addMonths(date, 1));
	};

	return (
		<div className={container}>
			<Button type="button" onClick={previousMonthHandler}>
				Previous
			</Button>
			<p>{format(date, "LLLL yyyy")}</p>
			<Button type="button" onClick={nextMonthHandler}>
				Next
			</Button>
		</div>
	);
}
