import { globalStyle } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalStyle(`*`, {
	boxSizing: `border-box`,
	margin: 0,
})

globalStyle(`html, body`, {
	minHeight: `100%`,
})

globalStyle('.dark', {
	colorScheme: 'dark',
})

globalStyle(`body`, {
	backgroundColor: "#f3f4f6",
	display: "flex",
	flex: 1,
	fontFamily: vars.font.body,
	lineHeight: 1.5,
	WebkitFontSmoothing: `antialiased`,
})

globalStyle(`.dark body`, {
	backgroundColor: vars.colors.stone900,
})

globalStyle("#__next", {
	display: "flex",
	flex: 1,
});

globalStyle(`img, picture, video, canvas, svg`, {
	display: `block`,
	maxWidth: `100%`,
})

globalStyle(`input, button, textarea, select`, {
	font: `inherit`,
})

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
	overflowWrap: `break-word`,
})

globalStyle(`#root`, {
	isolation: `isolate`,
})
