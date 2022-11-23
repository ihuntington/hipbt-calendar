import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const wrapper = style({
	color: vars.colors.body,
	display: `flex`,
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.md,
	width: `100%`,
})
