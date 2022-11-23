import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

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
	alignItems: "center",
	columnGap: "0.5rem",
	display: "grid",
	gridTemplateColumns: "[time] 3rem [line-start] repeat(7, 1fr) [line-end]",
});

export const time = style({
	background: vars.colors.background,
	gridColumn: "time",
	textAlign: "right",
	selectors: {
		[`${highlight} &`]: {
			color: vars.colors.red500,
		},
	}
});

export const line = style({
	backgroundColor: vars.colors.gray300,
	display: "block",
	gridColumn: "line-start / line-end",
	gridRow: 1,
	flex: 1,
	height: 1,
	selectors: {
		[`${highlight} &`]: {
			backgroundColor: vars.colors.red500,
		},
	}
});

export const marker = style({
	backgroundColor: vars.colors.red500,
	borderRadius: 9999,
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: vars.colors.background,
	display: "block",
	gridRow: 1,
	height: 12,
	transform: "translateX(-6px)",
	width: 12,
});
