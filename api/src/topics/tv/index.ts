import { TvResponse, Tv as ITv } from "@shared/types";
import { TMDB_API_ACCESS_TOKEN } from "@/config/env";
import UpdateDB from "@/utils/update-db";
import { ApiResponse } from "./ApiResponse";
import { GENRES } from "./genres";

export default async function Tv() {
  const accessToken = TMDB_API_ACCESS_TOKEN();
  if (accessToken) {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`❌ Tv. Status: ${response.status}`);
    }
    const responseBody: ApiResponse = await response.json();
    let tvList: ITv[] = [];
    responseBody.results
      .slice(0, Math.min(25, responseBody.results.length))
      .map((tv) => {
        tvList.push({
          id: tv.id.toString(),
          title: tv.name,
          description: tv.overview,
          url: `https://www.themoviedb.org/tv/${tv.id}`,
          image: `https://image.tmdb.org/t/p/original${tv.poster_path}`,
          title_original: tv.original_name,
          rating: tv.vote_average.toFixed(1),
          first_air_date: tv.first_air_date,
          genres: [
            ...tv.genre_ids.map((id) => ({
              id,
              name: GENRES[id] ? GENRES[id] : "",
            })),
          ],
        });
      });
    const apiResponse: TvResponse = {
      last_updated: new Date().toISOString(),
      data: tvList,
    };
    await UpdateDB("tv", apiResponse);
  }
}
