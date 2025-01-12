import { LAST_FM_API_KEY } from "../../config/env";
import UpdateDB from "../../util/update-db";

export default async function Music() {
  const lastFmApiKey = LAST_FM_API_KEY();
  if (lastFmApiKey) {
    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastFmApiKey}&format=json`
      );
      const responseBody = await response.json();
      if (!response.ok) {
        console.error("❌ Music", responseBody.message);
        return;
      }
      await UpdateDB("music", JSON.stringify(responseBody));
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  }
}
