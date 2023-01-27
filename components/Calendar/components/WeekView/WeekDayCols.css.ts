import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const separator = style({
	height: "100%",
	selectors: {
		"&::after": {
			content: `""`,
			display: "block",
			backgroundColor: vars.colors.gray300,
			height: "calc(100% - 16px)",
			transform: "translateY(8px)",
			width: 1,
		},
		".dark &::after": {
			backgroundColor: "hsl(0deg 0% 100% / 20%)",
		}
	}
});
