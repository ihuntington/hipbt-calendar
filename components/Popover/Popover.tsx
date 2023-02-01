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
		<PopoverPrimitive.Content asChild side="right" sideOffset={8} hideWhenDetached>
			<div className={styles.content}>{children}</div>
		</PopoverPrimitive.Content>
	);
});

PopoverContent.displayName = "PopoverContent";
