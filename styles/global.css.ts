import { globalStyle } from "@vanilla-extract/css"

globalStyle(`*`, {
	boxSizing: `border-box`,
	margin: 0,
})

globalStyle(`html, body`, {
	minHeight: `100%`,
	fontSize: `16px`,
})

globalStyle(`body`, {
	backgroundColor: "#f3f4f6",
	lineHeight: 1.5,
	WebkitFontSmoothing: `antialiased`,
})

globalStyle("body", {
	display: "flex",
	flex: 1,
});

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
