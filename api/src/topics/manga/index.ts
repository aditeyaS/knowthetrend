import UpdateDB from "../../util/update-db";

const url = `https://api.jikan.moe/v4/top/manga`;

export default async function Manga() {
  try {
    const response = await fetch(url);
    const responseBody = await response.json();
    if (!response.ok) {
      console.error("❌ Manga", responseBody.message);
      return;
    }
    await UpdateDB("manga", JSON.stringify(responseBody));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
