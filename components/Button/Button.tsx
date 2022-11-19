import { PropsWithChildren } from "react";

interface IButton {
	type: "button" | "submit";
	onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export function Button({ children, type = "button", onClick }: PropsWithChildren<IButton>) {
	return (
		<button type={type} onClick={onClick}>{children}</button>
	);
}
