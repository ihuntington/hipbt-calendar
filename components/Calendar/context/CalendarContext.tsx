import { endOfDay, isSameMinute, startOfDay, startOfMinute } from "date-fns";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

function getStateFromDate(date: Date) {
	const dayStart = startOfDay(date);
	const dayEnd = endOfDay(date);
	const time = startOfMinute(date);
	return {
		date: dayStart,
		time,
		dayStart,
		dayEnd,
	};
}

interface ICalendarContext {
	date: Date;
	time: Date;
	dayStart: Date;
	dayEnd: Date;
	marker: {
		posY: number;
	};
}

export const CalendarContext = createContext<ICalendarContext>({
	...getStateFromDate(new Date()),
	marker: {
		posY: 0,
	},
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
	const initialState: ICalendarContext = {
		...getStateFromDate(date),
		marker: {
			posY: 0,
		},
	};
	const [state, setState] = useState(initialState);

	const actions = useMemo(() => ({
		setDate: (date: Date) => setState((s) => ({
			...s,
			...getStateFromDate(date),
		})),
	}), []);

	useEffect(() => {
		const delay = 1000;
		let timeout = setTimeout(function tick() {
			const nextDate = startOfMinute(new Date());

			if (!isSameMinute(state.date, nextDate)) {
				actions.setDate(nextDate);
			}

			timeout = setTimeout(tick, delay);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [state.date, actions]);

	return (
		<CalendarContext.Provider value={state}>
			<CalendarActionContext.Provider value={actions}>
				{children}
			</CalendarActionContext.Provider>
		</CalendarContext.Provider>
	);
}
