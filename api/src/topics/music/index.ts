import { LAST_FM_API_KEY } from "../../config/env";
import UpdateDB from "../../util/update-db";

const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LAST_FM_API_KEY()}&format=json`;

export default async function Music() {
  try {
    const response = await fetch(url);
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
