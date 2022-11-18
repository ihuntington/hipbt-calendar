import { globalStyle, style } from "@vanilla-extract/css"

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
    background: "#f1f5f9",
    display: "grid",
    flex: 1,
    gridTemplateColumns: "4rem 1fr",
});

export const calendar = style({
    display: "grid",
    flex: 1,
    gridTemplateColumns: "repeat(7, 1fr)",
});

export const example = style({
    padding: "1rem",
});

export const weeksOfYear = style({
    display: "flex",
    flex: 1,
    flexDirection: "column",
});

export const weekNumber = style({
    color: "red",
});
