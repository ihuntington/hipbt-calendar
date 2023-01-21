import { style, createVar } from "@vanilla-extract/css";
import Color from 'color'
import { vars, colors } from "@/styles/theme.css";

const minHeight = createVar()
const multiplier = createVar()
const eventMinHeight = createVar()

export const height = createVar()
export const top = createVar()
export const gridColumn = createVar()

export const container = style({
	vars: {
		[minHeight]: '15px',
		[multiplier]: '2',
		[eventMinHeight]: `calc(${minHeight} * ${multiplier})`,
		[height]: eventMinHeight
	},
	backgroundColor: Color(colors.spotifyGreen).alpha(0.5).hsl().toString(),
	borderInlineStartWidth: 3,
	borderInlineStartStyle: 'solid',
	borderInlineStartColor: vars.colors.spotifyGreen,
	borderRadius: 6,
	display: 'flex',
	gridColumnStart: `calc(${gridColumn} + 2)`,
	gridColumnEnd: `calc(${gridColumn} + 2)`,
	gridRowStart: 1,
	lineHeight: 1,
	height: `max(${height}, ${eventMinHeight})`,
	top: `calc(${top} + 8px)`,
})

export const body = style({
	padding: 4,
})

export const time = style({
	fontSize: vars.fontSize.xs
})
