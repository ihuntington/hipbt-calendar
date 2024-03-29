import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const currentWeek = style({});

export const wrapper = style({
	display: "flex",
	flex: 1,
	flexDirection: "column",
	inlineSize: "100%",
	marginBlockStart: "6.5rem",
	marginBlockEnd: "4rem",
	paddingInline: "1rem",
});

export const count = style({
	display: "flex",
	placeContent: "flex-end",
	placeItems: "center",
	width: "3rem",

	selectors: {
		[`${currentWeek} &`]: {
			color: vars.colors.red500,
		},
	},
});

export const today = style({});

export const date = style({
	alignItems: "center",
	display: "inline-flex",
	height: "2rem",
	marginInlineStart: ".25rem",
	justifyContent: "center",

	selectors: {
		[`${today} &`]: {
			background: vars.colors.red500,
			borderRadius: 9999,
			color: vars.colors.white,
			width: "2rem",
		},
	},
});

export const col = style({
	flex: 1,
});

export const colDay = style([
	col,
	{
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
]);

export const day = style({
	selectors: {
		[`${today} &`]: {
			color: vars.colors.red500,
		},
	},
});

export const rowHeader = style({
	// backgroundColor: vars.colors.background,
	borderBlockEndWidth: 1,
	borderBlockEndColor: vars.colors.gray400,
	borderBlockEndStyle: "solid",
	display: "flex",
	gap: "0.5rem",
	height: 40,
	position: "fixed",
	top: 64,
	left: 0,
	right: 0,
	marginInline: "1rem",
	zIndex: 3,
});

// TODO: make dynamic
// Reference the height of the header & footer?
// Really don't need this class name
export const rowBodyWrapper = style({
	paddingTop: 104,
	paddingBottom: 64,
});
