import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const overflow = style({
	// TODO: make dynamic
	height: "calc(100vh - 128px - 41px)",
	overflowY: "scroll",
});

export const grid = style({
	position: "relative",
});

export const row = style({
	height: 120,
	selectors: {
		"&:nth-last-child(-n+2)": {
			height: "auto",
		}
	}
});

export const highlight = style({});

export const timeMarker = style({
	display: "flex",
	alignItems: "center",
	columnGap: 4,
});

export const time = style({
	background: vars.colors.background,
	textAlign: "right",
	width: "3rem",
	selectors: {
		[`${highlight} &`]: {
			color: vars.colors.red500,
		},
	}
});

export const line = style({
	backgroundColor: vars.colors.gray300,
	display: "block",
	flex: 1,
	height: 1,
	selectors: {
		[`${highlight} &`]: {
			backgroundColor: vars.colors.red500,
		},
	}
});
