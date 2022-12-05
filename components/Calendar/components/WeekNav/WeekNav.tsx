import { addWeeks, format, startOfDay } from "date-fns";
import Link from "next/link";
import { Flex } from "../../../Flex";
import { useCalendarContext } from "../../context/CalendarContext";

import * as styles from "./WeekNav.css";

function formatCalendarPath(date: Date) {
	return `/calendar/week/${format(date, "yyyy/MM/dd")}`;
}

export function WeekNav() {
	const { date } = useCalendarContext();

	const previousWeek = formatCalendarPath(addWeeks(date, -1));
	const today = formatCalendarPath(startOfDay(new Date()));
	const nextWeek = formatCalendarPath(addWeeks(date, 1));

	return (
		<Flex className={styles.root}>
			<Link href={previousWeek}>Previous</Link>
			<Link href={today}>Today</Link>
			<Link href={nextWeek}>Next</Link>
		</Flex>
	);
}
