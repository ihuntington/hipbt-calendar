import { App, Flex } from "../../components";
import { CalendarProvider } from "../../components/Calendar/context/CalendarContext";
import { WeekHeader, WeekNav, WeekView } from "../../components/Calendar/components";

import * as styles from "./index.css";

import "../../styles/global.css";

function Page({ children }: React.PropsWithChildren): React.ReactElement {
	return <div className={styles.page}>{children}</div>;
}

function Block({ children }: React.PropsWithChildren) {
	return <div className={styles.block}>{children}</div>;
}

export default function WeekViewIndex() {
	return (
		<App>
			<CalendarProvider date={new Date()}>
				<Page>
					<Block>
						<Flex justifyContent="spaceBetween">
							<WeekHeader />
							<WeekNav />
						</Flex>
					</Block>
					<WeekView />
					<Block>
						<p>Footer</p>
					</Block>
				</Page>
			</CalendarProvider>
		</App>
	);
}
