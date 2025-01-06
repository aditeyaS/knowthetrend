import { useEffect, useState } from "react";
import TopicsLayout from "../layout";
import { ApiResponse, IMovie } from "./api-response";
import { ExternalLink, Star } from "lucide-react";
import { getGenre } from "./get-genre";
import GetDB from "@/config/get-db";

export default function Movie() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("movie"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: ApiResponse = await response.json();
        setMovies(jsonData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      sourceText="themoviedb"
      sourceLink="https://www.themoviedb.org/"
    >
      <div className="flex flex-col gap-2">
        {movies.map((movie) => (
          <div key={movie.id} className="flex border p-2 rounded gap-4">
            <img
              className="w-24"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <div className="space-y-1">
              <a
                className="group flex items-center gap-1 text-xl hover:underline underline-offset-4"
                target="_blank"
                href={`https://www.themoviedb.org/movie/${movie.id}`}
              >
                {movie.title}
                {movie.original_title !== movie.title && (
                  <span className="text-muted-foreground font-light">
                    ({movie.original_title})
                  </span>
                )}
                <ExternalLink className="w-3 hidden group-hover:block" />
              </a>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {movie.vote_average.toFixed(1)}
                </span>
                <span>{movie.release_date}</span>
              </div>
              <p className="text-muted-foreground text-sm">{movie.overview}</p>
              <div className="text-sm flex gap-1">
                <span className="text-muted-foreground underline">Genre:</span>
                {movie.genre_ids.map((genre) => (
                  <span key={`movie-${movie.id}-genre-${genre}`}>
                    {getGenre(genre)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </TopicsLayout>
  );
}
