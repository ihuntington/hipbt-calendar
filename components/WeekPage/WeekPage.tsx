import { Flex } from "../";
import { CalendarProvider } from "../Calendar/context/CalendarContext";
import { MonthYearTitle, WeekNav, WeekView } from "../Calendar/components";

import "@/styles/global.css";

import * as styles from "./WeekPage.css";

function Page({ children }: React.PropsWithChildren): React.ReactElement {
	return <div className={styles.page}>{children}</div>;
}

export function WeekPage({ initialDate, now }: { initialDate: Date; now: Date }) {
	return (
		<CalendarProvider date={initialDate} time={now} view="week">
			<Page>
				<Flex
					alignItems="center"
					justifyContent="spaceBetween"
					className={styles.header}
				>
					<MonthYearTitle />
					<WeekNav />
				</Flex>
				<WeekView />
				<Flex alignItems="center" className={styles.footer}>
					<p>Footer</p>
				</Flex>
			</Page>
		</CalendarProvider>
	);
}
