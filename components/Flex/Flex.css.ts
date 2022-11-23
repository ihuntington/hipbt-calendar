import { style, styleVariants } from "@vanilla-extract/css";

export const display = style({
	display: "flex",
});

export const direction = styleVariants({
	column: {
		flexDirection: "column",
	},
	columnReverse: {
		flexDirection: "column-reverse",
	},
	row: {
		flexDirection: "row",
	},
	rowReverse: {
		flexDirection: "row-reverse",
	},
});

export const alignItems = styleVariants({
	normal: {
		justifyContent: "normal",
	},
	baseline: {
		justifyContent: "baseline",
	},
	flexStart: {
		alignItems: "flex-start",
	},
	flexEnd: {
		alignItems: "flex-end",
	},
	center: {
		alignItems: "center",
	},
	stretch: {
		alignItems: "stretch",
	},
});

export const justifyContent = styleVariants({
	normal: {
		justifyContent: "normal",
	},
	flexStart: {
		justifyContent: "flex-start",
	},
	flexEnd: {
		justifyContent: "flex-end",
	},
	center: {
		justifyContent: "center",
	},
	spaceAround: {
		justifyContent: "space-around",
	},
	spaceBetween: {
		justifyContent: "space-between",
	},
	spaceEvenly: {
		justifyContent: "space-evenly",
	},
});
