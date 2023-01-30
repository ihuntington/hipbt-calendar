import type { IEvent } from "../Calendar/components";

export const EventPanel = ({ event }: { event: IEvent }) => {
	const eventName = event.items[0].track.name;
	return (
		<div>
			<p>{eventName}</p>
			<ol>
				{event.items.map((item) => (
					<li key={item.id}>{item.track.name}</li>
				))}
			</ol>
		</div>
	);
};
