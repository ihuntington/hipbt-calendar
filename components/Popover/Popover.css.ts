import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const content = style({
	backgroundColor: vars.colors.gray900,
	color: vars.colors.white,
	width: 320,
	zIndex: 100,
})
