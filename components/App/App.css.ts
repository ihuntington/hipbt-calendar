import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const wrapper = style({
	alignItems: `center`,
	backgroundColor: vars.colors.background,
	color: vars.colors.body,
	display: `flex`,
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.md,
	height: `100vh`,
	justifyContent: `center`,
	width: `100%`,
})
