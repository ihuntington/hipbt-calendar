import type { Play } from "lib/bowie";

export const Tracklist = ({ items }: { items: Play[] }) => (
	<ol>
		{items.map((item) => (
			<li key={item.id}>{item.track.name}</li>
		))}
	</ol>
);
