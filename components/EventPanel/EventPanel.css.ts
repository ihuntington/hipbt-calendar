import { vars } from "@/styles/theme.css"
import { style } from "@vanilla-extract/css"

export const panel = style({
	backgroundColor: "#233923",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: vars.colors.spotifyGreen,
	borderRadius: 6,
	padding: "1rem",
	width: "30rem",
	zIndex: 100,
	selectors: {
		'.dark &': {
			backgroundColor: "hsl(141deg 40% 10%)"
		}
	}
})

export const card = style({
	display: "grid",
	gap: 8,
	gridTemplateColumns: "1fr 3fr",
	gridTemplateAreas: `
		"image title"
		"image content"
	`
})

export const image = style({
	aspectRatio: "1",
	position: "relative",
	gridArea: "'image'"
})

export const title = style({
	fontSize: 20,
	gridArea: "title"
})
