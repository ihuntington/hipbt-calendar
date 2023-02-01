import { useRouter } from "next/router";
import { addWeeks, format, startOfDay } from "date-fns";
import { Button } from "@/components/Button/Button";
import { Flex } from "@/components/Flex/Flex";
import { useCalendarActionContext, useCalendarContext } from "../../context/CalendarContext";

import * as styles from "./WeekNav.css";

function formatCalendarPath(date: Date) {
	return `/calendar/week/${format(date, "yyyy/MM/dd")}`;
}

export function WeekNav() {
	const router = useRouter();
	const actions = useCalendarActionContext();
	const { date } = useCalendarContext();

	const setDate = (date: Date) => {
		actions.setDate(date);
		router.push(
			{
				protocol: window.location.protocol,
				host: window.location.host,
				pathname: formatCalendarPath(date),
			},
			undefined,
			{ scroll: false, shallow: true }
		);
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
			<Button type="button" onClick={previousWeek}>
				Previous
			</Button>
			<Button type="button" onClick={today}>
				Today
			</Button>
			<Button type="button" onClick={nextWeek}>
				Next
			</Button>
		</Flex>
	);
}
