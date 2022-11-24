import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	endOfDay,
	endOfWeek,
	isSameMinute,
	startOfDay,
	startOfMinute,
	startOfWeek,
} from "date-fns";

function getStateFromDate(date: Date) {
	const dayStart = startOfDay(date);
	const dayEnd = endOfDay(date);
	return {
		date: dayStart,
		dayStart,
		dayEnd,
		weekStart: startOfWeek(date, { weekStartsOn: 1 }),
		weekEnd: endOfWeek(date, { weekStartsOn: 1 }),
	};
}

type CalendarView = "day" | "week" | "month" | "year";

interface ICalendarStateContext {
	date: Date;
	time: Date;
	dayStart: Date;
	dayEnd: Date;
	view: CalendarView;
	weekStart: Date;
	weekEnd: Date;
}

export const CalendarStateContext = createContext<ICalendarStateContext>({
	...getStateFromDate(new Date()),
	time: startOfMinute(new Date()),
	view: "week",
});

CalendarStateContext.displayName = "CalendarStateContext";

export const useCalendarContext = () => useContext(CalendarStateContext);

interface ICalendarActionContext {
	setDate: (date: Date) => void;
}

export const CalendarActionContext = createContext<
	ICalendarActionContext | undefined
>(undefined);

CalendarActionContext.displayName = "CalendarActionContext";

export const useCalendarActionContext = () => useContext(CalendarActionContext);

export function CalendarProvider({
	children,
	date,
	view = "week",
}: PropsWithChildren<Pick<ICalendarStateContext, "date" | "view">>) {
	const initialState: ICalendarStateContext = {
		...getStateFromDate(date),
		time: startOfMinute(date),
		view,
	};
	const [state, setState] = useState(initialState);

	const actions = useMemo(
		() => ({
			setDate: (date: Date) =>
				setState((s) => ({
					...s,
					...getStateFromDate(date),
				})),
			setTime: (date: Date) =>
				setState((s) => ({ ...s, time: startOfMinute(date) })),
		}),
		[]
	);

	useEffect(() => {
		const delay = 1000;
		let timeout = setTimeout(function tick() {
			const nextTime = startOfMinute(new Date());

			if (!isSameMinute(state.time, nextTime)) {
				actions.setTime(nextTime);
			}

			timeout = setTimeout(tick, delay);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [state.time, actions]);

	return (
		<CalendarStateContext.Provider value={state}>
			<CalendarActionContext.Provider value={actions}>
				{children}
			</CalendarActionContext.Provider>
		</CalendarStateContext.Provider>
	);
}
