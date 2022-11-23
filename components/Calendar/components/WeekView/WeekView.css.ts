import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const currentWeek = style({});

export const overflow = style({
	height: "calc(100vh - 128px - 41px)",
	overflowY: "scroll",
});

export const wrapper = style({
	display: "flex",
	flex: 1,
	flexDirection: "column",
	inlineSize: "100%",
	paddingInline: "1rem",
});

export const weekView = style({
});

export const weekViewBody = style({
});

export const hourRow = style({
	height: 64,
});

export const timeLine = style({
	display: "flex",
	alignItems: "center",
	columnGap: 4,
})

export const time = style({
	textAlign: "right",
	width: "3rem",
});

export const line = style({
	backgroundColor: vars.colors.gray300,
	display: "block",
	flex: 1,
	height: 1,
});

export const count = style({
	display: "flex",
	placeContent: "end",
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

export const colDay = style([col, {
	display: "flex",
	alignItems: "center",
}]);

export const day = style({
	selectors: {
		[`${today} &`]: {
			color: vars.colors.red500,
		},
	},
});

export const row = style({
	display: "flex",
	inlineSize: "100%",
	gap: "0.5rem",
});

export const rowHeader = style([row, {
	borderBlockEndWidth: 1,
	borderBlockEndColor: vars.colors.gray400,
	borderBlockEndStyle: "solid",
	height: 40,
}]);

