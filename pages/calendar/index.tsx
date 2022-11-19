import { CalendarView } from "../../components";
import { PropsWithChildren, ReactElement } from "react";

import { example, page } from "../../components/Calendar/calendar.css";
import { MonthNav } from "../../components/Calendar/components";
import { CalendarProvider } from "../../components/Calendar/context/CalendarContext";

function Page({ children }: PropsWithChildren): ReactElement {
	return <div className={page}>{children}</div>;
}

function Block({ children }: PropsWithChildren) {
	return <div className={example}>{children}</div>;
}

export default function CalendarIndex() {
	return (
		<CalendarProvider date={new Date()}>
			<Page>
				<Block>
					<MonthNav />
				</Block>
				<CalendarView />
				<Block>
					<p>footer</p>
				</Block>
			</Page>
		</CalendarProvider>
	);
}
