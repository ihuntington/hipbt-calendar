import { style, styleVariants } from "@vanilla-extract/css";

export const selected = styleVariants({
	base: {
		background: "transparent",
	},
	selected: {
		background: "#7dd3fc",
	},
});

export const dayVariant = styleVariants({
    inMonth: {
        color: "#475569",
    },
    outMonth: {
        color: "#cbd5e1",
    },
});
