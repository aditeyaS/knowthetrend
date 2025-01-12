import { AnimeResponse, Anime as IAnime } from "../../../../shared/types";
import UpdateDB from "../../util/update-db";
import { ApiResponse } from "./ApiResponse";

const url = `https://api.jikan.moe/v4/top/anime`;

export default async function Anime() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("❌ Anime", response);
      return;
    }
    const responseBody: ApiResponse = await response.json();
    let animeList: IAnime[] = [];
    responseBody.data
      .slice(0, Math.min(25, responseBody.data.length))
      .map((anime) => {
        animeList.push({
          id: anime.mal_id.toString(),
          title: anime.title,
          url: anime.url,
          title_english: anime.title_english,
          title_japanese: anime.title_japanese,
          image: anime.images.jpg.image_url,
          trailer: anime.trailer.url,
          episodes: anime.episodes,
          rating: anime.score.toFixed(1),
          year: anime.year,
          description: anime.synopsis,
          genres: [
            ...anime.genres.map((g) => ({ id: g.mal_id, name: g.name })),
          ],
        });
      });
    const apiResponse: AnimeResponse = {
      last_updated: new Date().toISOString(),
      data: animeList,
    };
    await UpdateDB("anime", apiResponse);
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
