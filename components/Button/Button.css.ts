import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const button = style({
	border: `none`,
	background: "transparent",
	color: vars.colors.black,
	borderWidth: `2px`,
	borderStyle: `solid`,
	borderColor: vars.colors.black,
	borderRadius: vars.radii.md,
	paddingInline: vars.space.sm,
	paddingBlock: vars.space.xs,
	selectors: {
		"&:hover": {
			color: vars.colors.linkHover,
			cursor: `pointer`,
			borderColor: vars.colors.linkHover,
		},
	},
});
