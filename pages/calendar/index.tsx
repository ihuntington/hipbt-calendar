import { CalendarView } from "../../components";
import type { PropsWithChildren, ReactElement } from "react";

import { example, page } from "../../components/Calendar/calendar.css";
import { format, getMonth } from "date-fns";

function Page({ children }: PropsWithChildren): ReactElement {
	return <div className={page}>{children}</div>;
}

function Block({ children }: PropsWithChildren) {
	return <div className={example}>{children}</div>;
}

export default function CalendarIndex() {
	const date = new Date();
	return (
		<Page>
			<Block>
				<p>{format(date, "LLLL")}</p>
			</Block>
			<CalendarView date={date} />
			<Block>
				<p>footer</p>
			</Block>
		</Page>
	);
}
