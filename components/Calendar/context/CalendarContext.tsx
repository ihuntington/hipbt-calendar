import { startOfDay } from "date-fns";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

interface ICalendarContext {
	date: Date;
}

export const CalendarContext = createContext<ICalendarContext>({
	date: startOfDay(new Date()),
});

export const useCalendarContext = () => useContext(CalendarContext);

interface ICalendarActionContext {
	setDate: (date: Date) => void;
}

export const CalendarActionContext = createContext<
	ICalendarActionContext | undefined
>(undefined);

export const useCalendarActionContext = () => useContext(CalendarActionContext);

export function CalendarProvider({
	children,
	date,
}: PropsWithChildren<ICalendarContext>) {
	const [state, setState] = useState({ date: startOfDay(date) });

	const actions = useMemo(() => ({
		setDate: (date: Date) => setState((s) => ({ ...s, date: startOfDay(date) })),
	}), []);

	return (
		<CalendarContext.Provider value={state}>
			<CalendarActionContext.Provider value={actions}>
				{children}
			</CalendarActionContext.Provider>
		</CalendarContext.Provider>
	);
}
