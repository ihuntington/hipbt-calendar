import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html", {
	display: "flex",
	flexDirection: "column",
	minHeight: "100%",
});

globalStyle("body", {
	display: "flex",
	flex: 1,
});

globalStyle("#__next", {
	display: "flex",
	flex: 1,
});

export const page = style({
	blockSize: "100%",
	display: "flex",
	flexDirection: "column",
	inlineSize: "100%",
});

export const calendarView = style({
	display: "grid",
	flex: 1,
	gridTemplateColumns: "4rem 1fr",
	gridTemplateRows: "min-content 1fr",
	gridTemplateAreas: `
		". header"
		"weeks body"
	`,
});

export const calendar = style({
	display: "grid",
	flex: 1,
	gridTemplateColumns: "repeat(7, 1fr)",
	gridArea: "body",
});

export const example = style({
	padding: "1rem",
});

export const weeksOfYear = style({
	display: "grid",
	gridArea: "weeks",
	order: 1,
	width: "4rem",
});

export const weekNumber = style({
	color: "red",
});
