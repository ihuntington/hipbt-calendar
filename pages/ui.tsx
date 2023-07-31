import { HourGrid } from "@/components/Calendar/components";
import { CalendarProvider } from "@/components/Calendar/context/CalendarContext";

import "../styles/global.css";

export default function UIPage() {
	return (
		<CalendarProvider date={new Date()} time={new Date()} view="week">
			<HourGrid date={new Date()} />
		</CalendarProvider>
	);
}
