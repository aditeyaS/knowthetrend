import { LAST_FM_API_KEY } from "@/config/env";
import UpdateDB from "@/utils/update-db";

export default async function Music() {
  const lastFmApiKey = LAST_FM_API_KEY();
  if (lastFmApiKey) {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastFmApiKey}&format=json`
    );
    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error(`❌ Music. Status: ${response.status}`);
    }
    await UpdateDB("music", responseBody);
  }
}
