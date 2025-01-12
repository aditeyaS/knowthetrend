import { TMDB_API_KEY } from "../../config/env";
import UpdateDB from "../../util/update-db";

export default async function Movie() {
  const tmdbApiKey = TMDB_API_KEY();
  if (tmdbApiKey) {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      };
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      );
      const responseBody = await response.json();
      if (!response.ok) {
        console.error("❌ Movie", responseBody.message);
        return;
      }
      await UpdateDB("movie", JSON.stringify(responseBody));
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  }
}
