import { Redis } from "ioredis";

const client = new Redis({
	port: 63790,
});

client.on("error", (error) => {
	console.error(console.error);
});

client.on("connection", () => {
	console.log("Connected successfull!");
});

export function setTracks(ids: string[], data: string) {
	const key = `calendar:tracks-${ids.join('-')}`;
	return client.set(key, data, "EX", 300, "NX");
}

export async function getTracks(ids: string[]) {
	const key = `calendar:tracks-${ids.join('-')}`;
	const result = await client.get(key);
	if (!result) {
		return null;
	}
	return JSON.parse(result);
}
