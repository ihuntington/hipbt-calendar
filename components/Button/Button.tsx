import { PropsWithChildren } from "react";

import * as styles from "./Button.css";

interface IButton {
	type: "button" | "submit";
	onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export function Button({ children, type = "button", onClick }: PropsWithChildren<IButton>) {
	return (
		<button type={type} onClick={onClick} className={styles.button}>{children}</button>
	);
}
