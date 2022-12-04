import { style } from "@vanilla-extract/css";

export const grid = style({
	display: "grid",
	columnGap: "0.5rem",
	gridTemplateColumns: "3rem repeat(7, 1fr)",
	// pointerEvents: "none",
	position: "absolute",
	top: 0,
	bottom: 0,
	width: "100%",
});
