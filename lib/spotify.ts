import Process from "process";
import qs from "query-string";

type SpotifyAuthResponse = {
	access_token: string,
	token_type: string,
	expires_in: number
}

export class Spotify {

	token: SpotifyAuthResponse | null = null

	async getAccessToken() {
		try {
			const authEncodedString = Buffer.from(
				`${Process.env.SPOTIFY_CLIENT_ID}:${Process.env.SPOTIFY_CLIENT_SECRET}`
			);
			const token = authEncodedString.toString("base64");
			const url = "https://accounts.spotify.com/api/token";
			const response = await fetch(url, {
				method: "POST",
				body: qs.stringify({ grant_type: "client_credentials" }),
				headers: {
					Authorization: `Basic ${token}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			if (response.ok) {
				this.token = await response.json() as SpotifyAuthResponse
			}
		} catch (err) {
			console.log(err);
			throw new Error("Failed to authenticate");
		}
	}

	async getTracks(ids: string[]) {
		if (!this.token) {
			await this.getAccessToken();
		}

		try {
			const url = `https://api.spotify.com/v1/tracks?ids=${ids.join(",")}`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${this.token?.access_token}`,
				},
			});

			if (response.ok) {
				return await response.json()
			}
		} catch (err) {
			console.error(err);
			return { tracks: [] };
		}
	}
}
