import { useRouter } from "next/router";
import { App, Flex } from "../../../components";
import { CalendarProvider } from "../../../components/Calendar/context/CalendarContext";
import { WeekHeader, WeekNav, WeekView } from "../../../components/Calendar/components";
import { useInitialDate } from "@/components/Calendar/hooks/useInitialDate";

import "@/styles/global.css";

import * as styles from "./index.css";

function Page({ children }: React.PropsWithChildren): React.ReactElement {
	return <div className={styles.page}>{children}</div>;
}

export default function WeekViewIndex() {
	const date = new Date();
	const router = useRouter();
	const calendar = useInitialDate(date);

	if (!router.isReady) {
		return null;
	}

	return (
		<App>
			<CalendarProvider date={calendar.date} view="week">
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
