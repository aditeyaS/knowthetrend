import { MovieResponse, Movie as IMovie } from "@shared/types";
import { TMDB_API_ACCESS_TOKEN } from "@/config/env";
import UpdateDB from "@/utils/update-db";
import { ApiResponse } from "./ApiResponse";
import { GENRES } from "./genres";

export default async function Movie() {
  const accessToken = TMDB_API_ACCESS_TOKEN();
  if (accessToken) {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`❌ Movie. Status: ${response.status}`);
    }
    const responseBody: ApiResponse = await response.json();
    let movieList: IMovie[] = [];
    responseBody.results
      .slice(0, Math.min(25, responseBody.results.length))
      .map((movie) => {
        movieList.push({
          id: movie.id.toString(),
          title: movie.title,
          title_original: movie.original_title,
          description: movie.overview,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          rating: movie.vote_average.toFixed(1),
          release_date: movie.release_date,
          genres: [
            ...movie.genre_ids.map((id) => ({
              id,
              name: GENRES[id] ? GENRES[id] : "",
            })),
          ],
        });
      });
    const apiResponse: MovieResponse = {
      last_updated: new Date().toISOString(),
      data: movieList,
    };
    await UpdateDB("movie", apiResponse);
  }
}
