import React from "react";
import clsx from "clsx";

import * as styles from "./Flex.css";

type Element = "div" | "span" | "section";

type FlexDirection = keyof typeof styles.direction;

type JustifyContent = keyof typeof styles.justifyContent;

type AlignItems = keyof typeof styles.alignItems;

interface IFlex {
	/** HTML Element type
	 * @default 'div'
	 */
	as?: Element;
	/** Flex direction
	 * @default 'row'
	 */
	direction?: FlexDirection;
	/** Justify content
	 * @default 'normal'
	 */
	justifyContent?: JustifyContent;
	/** Align items
	 * @default 'normal'
	 */
	alignItems?: AlignItems;
	className?: string;
}

export function Flex({
	children,
	as = "div",
	direction = "row",
	justifyContent = "normal",
	alignItems = "normal",
	className = "",
}: React.PropsWithChildren<IFlex>) {
	const Component = as;
	return (
		<Component
			className={clsx(
				styles.display,
				styles.direction[direction],
				styles.justifyContent[justifyContent],
				styles.alignItems[alignItems],
				className
			)}
		>
			{children}
		</Component>
	);
}
