import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const button = style({
	border: `none`,
	background: vars.colors.blue600,
	color: vars.colors.white,
	borderWidth: `1px`,
	borderStyle: `solid`,
	borderColor: `transparent`,
	borderRadius: vars.radii.sm,
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
