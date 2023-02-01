import { style, styleVariants } from "@vanilla-extract/css";

export const selected = styleVariants({
	base: {
		background: "transparent",
	},
	selected: {
		background: "#7dd3fc",
	},
});

export const cell = styleVariants({
	inMonth: {
		color: "#27272a",
	},
	outMonth: {
		color: "#a1a1aa",
	},
});

const cellBase = style({});
