import React from "react";
import * as styles from "./WeekGrid.css";

export function WeekGrid({ children }: { children: React.ReactNode }) {
	return <div className={styles.grid}>{children}</div>;
}
