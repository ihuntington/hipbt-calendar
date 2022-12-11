import { PropsWithChildren, ReactElement } from "react";
import { App, CalendarView } from "../../components";

import { example, page } from "../../components/Calendar/calendar.css";
import { MonthNav, TodayButton } from "../../components/Calendar/components";
import { CalendarProvider } from "../../components/Calendar/context/CalendarContext";

import "../../styles/global.css";

function Page({ children }: PropsWithChildren): ReactElement {
	return <div className={page}>{children}</div>;
}

function Block({ children }: PropsWithChildren) {
	return <div className={example}>{children}</div>;
}

export default function CalendarIndex() {
	return (
		<App>
			<CalendarProvider date={new Date()} time={new Date()} view="month">
				<Page>
					<Block>
						<MonthNav />
					</Block>
					<CalendarView />
					<Block>
						<TodayButton />
					</Block>
				</Page>
			</CalendarProvider>
		</App>
	);
}
