import { addWeeks, startOfDay } from "date-fns";
import { Button } from "../../../Button";
import { Flex } from "../../../Flex";
import { useCalendarActionContext, useCalendarContext } from "../../context/CalendarContext";

import * as styles from "./WeekNav.css";

export function WeekNav() {
	const actions = useCalendarActionContext();
	const { date } = useCalendarContext();

	const setDate = (date: Date) => {
		actions?.setDate(date);
	};

	const nextWeek = () => {
		setDate(addWeeks(date, 1));
	};

	const previousWeek = () => {
		setDate(addWeeks(date, -1));
	};

	const today = () => {
		setDate(startOfDay(new Date()));
	};

	return (
		<Flex className={styles.root}>
			<Button type="button" onClick={previousWeek}>Previous</Button>
			<Button type="button" onClick={today}>Today</Button>
			<Button type="button" onClick={nextWeek}>Next</Button>
		</Flex>
	);
}
