import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
    display: "flex",
    flexDirection: "column",
    inlineSize: "100%",
});

export const header = style({
	backgroundColor: vars.colors.background,
	height: "4rem",
	marginInline: "1rem",
	position: "sticky",
	left: 0,
	top: 0,
	right: 0,
	zIndex: 1,
});

export const footer = style([header, {
	bottom: 0,
	top: "unset",
}]);
