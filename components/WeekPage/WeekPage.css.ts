import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
	display: "flex",
	flexDirection: "column",
	inlineSize: "100%",
	selectors: {
		'.dark &': {
			backgroundColor: "hsl(141deg 40% 10%)"
		}
	}
});

export const header = style({
	backgroundColor: vars.colors.gray100,
	height: "4rem",
	marginInline: "1rem",
	position: "fixed",
	left: 0,
	top: 0,
	right: 0,
	zIndex: 3,
	selectors: {
		".dark &": {
			backgroundColor: "hsl(141deg 40% 10%)"
		},
	},
});

export const footer = style([
	header,
	{
		bottom: 0,
		top: "unset",
	},
]);
