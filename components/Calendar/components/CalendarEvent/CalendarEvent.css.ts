import { style, createVar, createContainer } from "@vanilla-extract/css";
import Color from "color";
import { vars, colors } from "@/styles/theme.css";

const minHeight = createVar();
const multiplier = createVar();
const eventMinHeight = createVar();

export const height = createVar();
export const top = createVar();
export const gridColumn = createVar();

export const bodyContainer = createContainer()

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
	containerName: bodyContainer,
	containerType: "size",
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
	display: "flex",
	flex: 1,
	flexDirection: "column",
	justifyContent: "center",
	padding: 4,
	"@container": {
		[`${bodyContainer} (min-height: 2.5rem)`]: {
			justifyContent: "flex-start",
			paddingBlock: 6,
		}
	},
});

export const time = style({
	fontSize: vars.fontSize.xs,
	color: vars.colors.black,
	display: "none",
	"@container": {
		[`${bodyContainer} (min-height: 2.5rem)`]: {
			display: "block"
		}
	},
	selectors: {
		['.dark &']: {
			color: vars.colors.spotifyGreen
		}
	},
});

export const title = style({
	fontSize: vars.fontSize.sm,
	color: vars.colors.black,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	"@container": {
		[`${bodyContainer} (min-height: 2.5rem)`]: {
			marginBlockStart: 2,
		}
	},
	selectors: {
		['.dark &']: {
			color: vars.colors.spotifyGreen
		}
	}
});
