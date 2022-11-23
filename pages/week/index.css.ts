import { style } from "@vanilla-extract/css";

export const page = style({
    display: "flex",
    flexDirection: "column",
    inlineSize: "100%",
});

export const header = style({
	height: "4rem",
	marginInline: "1rem",
});

export const footer = style([header]);
