import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const weekView = style({
	display: "flex",
	flex: 1,
	flexDirection: "column",
	inlineSize: "100%",
	padding: "1rem",
});

export const count = style({
	display: "flex",
	placeContent: "center",
	placeItems: "center",
	width: "4rem",
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
	paddingBlockEnd: ".25rem",
}]);

export const col = style({
	flex: 1,
});
