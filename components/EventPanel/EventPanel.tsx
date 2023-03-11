import Image from "next/image";
import type { IEvent } from "../Calendar/components";
import { Tracklist } from "../Tracklist/Tracklist";
import * as styles from "./EventPanel.css";

export const EventPanel = ({ event }: { event: IEvent }) => {
	const coverTrack = event.items[0];
	return (
		<div className={styles.panel}>
			<div className={styles.card}>
				<div className={styles.image}>
					<Image src={event.images[1].url} alt={coverTrack.track.name} fill />
				</div>
				<h1 className={styles.title}>{coverTrack.track.name}</h1>
			</div>
			<Tracklist items={event.items.slice(0, 10)} />
		</div>
	);
};
