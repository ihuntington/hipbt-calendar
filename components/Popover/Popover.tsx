import React, { forwardRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as styles from "./Popover.css";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverPortal = PopoverPrimitive.Portal;

interface IPopoverContent {
	children: React.ReactNode;
}

export const PopoverContent = forwardRef<HTMLDivElement, IPopoverContent>(({ children }, ref) => {
	return (
		<PopoverPrimitive.Content
			side="right"
			sideOffset={8}
			hideWhenDetached
			className={styles.content}
		>
			{children}
		</PopoverPrimitive.Content>
	);
});

PopoverContent.displayName = "PopoverContent";
