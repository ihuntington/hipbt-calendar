import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const month = style({
	fontSize: vars.fontSize.xl,
	fontWeight: 600,
	selectors: {
		"&:after": {
			content: `" "`,
		},
	},
});

export const year = style({
	fontSize: vars.fontSize.xl,
});
