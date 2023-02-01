import { startOfToday } from "date-fns";
import { Button } from "../../../Button/Button";
import { useCalendarActionContext, useCalendarContext } from "../../context/CalendarContext";

export function TodayButton() {
	const actions = useCalendarActionContext();

	const handleClick = () => {
		actions?.setDate(startOfToday());
	};

	return (
		<Button type="button" onClick={handleClick}>
			Today
		</Button>
	);
}
