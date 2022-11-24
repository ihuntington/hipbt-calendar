import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const separator = style({
	height: "100%",
	selectors: {
		"&::after": {
			content: `""`,
			display: "block",
			backgroundColor: vars.colors.gray300,
			height: "100%",
			width: 1,
		}
	}
});
