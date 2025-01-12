import { MangaResponse, Manga as IManga } from "../../../../shared/types";
import UpdateDB from "../../util/update-db";
import { ApiResponse } from "./ApiResponse";

const url = `https://api.jikan.moe/v4/top/manga`;

export default async function Manga() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("❌ Manga", response);
      return;
    }
    const responseBody: ApiResponse = await response.json();
    let mangaList: IManga[] = [];
    responseBody.data
      .slice(0, Math.min(25, responseBody.data.length))
      .map((manga) => {
        mangaList.push({
          id: manga.mal_id.toString(),
          title: manga.title,
          url: manga.url,
          image: manga.images.jpg.image_url,
          title_english: manga.title_english,
          title_japanese: manga.title_japanese,
          rating: manga.score.toFixed(1),
          description: manga.synopsis,
          genres: [
            ...manga.genres.map((g) => ({ id: g.mal_id, name: g.name })),
          ],
        });
      });
    const apiResponse: MangaResponse = {
      last_updated: new Date().toISOString(),
      data: mangaList,
    };
    await UpdateDB("manga", apiResponse);
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
