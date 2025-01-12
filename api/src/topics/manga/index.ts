import { MangaApiResponse, MangaResponse } from "../../types/manga";
import UpdateDB from "../../util/update-db";

const url = `https://api.jikan.moe/v4/top/manga`;

export default async function Manga() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("❌ Manga", response);
      return;
    }
    const responseBody: MangaApiResponse = await response.json();
    let apiResponse: MangaResponse[] = [];
    responseBody.data.map((manga) => {
      apiResponse.push({
        id: manga.mal_id.toString(),
        title: manga.title,
        url: manga.url,
        image: manga.images.jpg.image_url,
        title_english: manga.title_english,
        rating: manga.score,
        description: manga.synopsis,
        genres: [...manga.genres.map((g) => ({ id: g.mal_id, name: g.name }))],
      });
    });
    await UpdateDB("manga", JSON.stringify(apiResponse));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
