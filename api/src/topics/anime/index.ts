import UpdateDB from "../../util/update-db";

const url = `https://api.jikan.moe/v4/top/anime`;

export default async function Anime() {
  try {
    const response = await fetch(url);
    const responseBody = await response.json();
    if (!response.ok) {
      console.error("❌ Anime", responseBody.message);
      return;
    }
    await UpdateDB("anime", JSON.stringify(responseBody));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
