import { App, Flex } from "../../components";
import { CalendarProvider } from "../../components/Calendar/context/CalendarContext";
import { WeekHeader, WeekNav, WeekView } from "../../components/Calendar/components";

import * as styles from "./index.css";

import "../../styles/global.css";

function Page({ children }: React.PropsWithChildren): React.ReactElement {
	return <div className={styles.page}>{children}</div>;
}

export default function WeekViewIndex() {
	return (
		<App>
			<CalendarProvider date={new Date()}>
				<Page>
					<Flex alignItems="center" justifyContent="spaceBetween" className={styles.header}>
						<WeekHeader />
						<WeekNav />
					</Flex>
					<WeekView />
					<Flex alignItems="center" className={styles.footer}>
						<p>Footer</p>
					</Flex>
				</Page>
			</CalendarProvider>
		</App>
	);
}
