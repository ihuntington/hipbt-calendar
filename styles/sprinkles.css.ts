import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

const { fontSize } = vars;

const unresponsiveProperties = defineProperties({
	properties: {
		fontSize,
		lineHeight: fontSize,
		fontWeight: [400, 500, 600, 700, 800],
		position: ["static", "relative", "absolute", "sticky", "fixed"],
		overflowX: ["visible", "hidden", "clip", "scroll", "auto"],
		overflowY: ["visible", "hidden", "clip", "scroll", "auto"],
	}
});

export const sprinkles = createSprinkles(unresponsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
