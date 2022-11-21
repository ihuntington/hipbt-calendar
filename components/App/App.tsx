import React from "react";
import clsx from "clsx";

import { lightThemeClass, darkThemeClass } from "../../styles/theme.css";
import * as styles from "./App.css";

export function App({ children }: React.PropsWithChildren) {
	const schemeClass = lightThemeClass;
	return (
		<div className={clsx(schemeClass, styles.wrapper)}>
			{children}
		</div>
	)
}
