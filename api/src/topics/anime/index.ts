import { AnimeApiResponse, AnimeResponse } from "../../types/anime";
import UpdateDB from "../../util/update-db";

const url = `https://api.jikan.moe/v4/top/anime`;

export default async function Anime() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("❌ Anime", response);
      return;
    }
    const responseBody: AnimeApiResponse = await response.json();
    let apiResponse: AnimeResponse[] = [];
    responseBody.data.map((anime) => {
      apiResponse.push({
        id: anime.mal_id.toString(),
        title: anime.title,
        url: anime.url,
        title_english: anime.title_english,
        image: anime.images.jpg.image_url,
        trailer: anime.trailer.url,
        episodes: anime.episodes,
        rating: anime.score,
        year: anime.year,
        description: anime.synopsis,
        genres: [...anime.genres.map((g) => ({ id: g.mal_id, name: g.name }))],
      });
    });
    await UpdateDB("anime", JSON.stringify(apiResponse));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
