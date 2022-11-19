import { style } from "@vanilla-extract/css";

export const daysOfWeek = style({
	display: "flex",
	gridArea: "header",
	width: "100%",
});

export const dayOfWeek = style({
	flex: 1,
});
