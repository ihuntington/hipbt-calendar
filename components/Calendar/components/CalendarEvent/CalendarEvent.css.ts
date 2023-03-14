import { style, createVar } from "@vanilla-extract/css";
import Color from "color";
import { vars, colors } from "@/styles/theme.css";

const minHeight = createVar();
const multiplier = createVar();
const eventMinHeight = createVar();

export const height = createVar();
export const top = createVar();
export const gridColumn = createVar();

export const container = style({
	vars: {
		[minHeight]: "15px",
		[multiplier]: "2",
		[eventMinHeight]: `calc(${minHeight} * ${multiplier})`,
		[height]: eventMinHeight,
	},
	backgroundColor: Color(colors.spotifyGreen).alpha(0.5).hsl().toString(),
	borderInlineStartWidth: 3,
	borderInlineStartStyle: "solid",
	borderInlineStartColor: vars.colors.spotifyGreen,
	borderRadius: 6,
	display: "flex",
	gridColumnStart: `calc(${gridColumn} + 2)`,
	gridColumnEnd: `calc(${gridColumn} + 2)`,
	gridRowStart: 1,
	lineHeight: 1,
	height: `max(${height}, ${eventMinHeight})`,
	top: `calc(${top} + 8px)`,
	width: "100%",
	selectors: {
		".dark &": {
			backgroundColor: Color(colors.spotifyGreen).alpha(0.15).hsl().toString(),
		},
	},
});

export const body = style({
	flex: 1,
	padding: 4,
});

export const time = style({
	fontSize: vars.fontSize.xs,
	color: vars.colors.black,
	selectors: {
		['.dark &']: {
			color: vars.colors.spotifyGreen
		}
	}
});

export const title = style({
	color: vars.colors.black,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	selectors: {
		['.dark &']: {
			color: vars.colors.spotifyGreen
		}
	}
});
