import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { MovieResponse } from "@shared/types";
import GetDB from "@/config/get-db";
import { Badge } from "@/components/ui/badge";
import TopicsLayout from "../layout";

export default function Movie() {
  const [movieResponse, setMovieResponse] = useState<MovieResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("movie"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setMovieResponse(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Movie"
      sourceText="themoviedb"
      sourceLink="https://www.themoviedb.org/"
    >
      <div className="flex flex-col gap-5">
        {movieResponse?.data.map((movie, index) => (
          <a
            key={movie.id}
            href={movie.url}
            target="_blank"
            className="relative  flex items-start border p-5 rounded gap-4 hover:border-primary"
          >
            <h1 className="absolute bg-primary p-1 rounded">#{index + 1}</h1>
            <img className="h-96" src={movie.image} />
            <div className="flex flex-col space-y-2">
              <span className="text-xl flex items-center gap-1">
                {movie.title}
                {movie.title_original !== movie.title && (
                  <span className="text-muted-foreground font-light">
                    ({movie.title_original})
                  </span>
                )}
                <ExternalLink className="w-3 hidden " />
              </span>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {movie.rating}
                </span>
                <span>{movie.release_date}</span>
              </div>
              <p className="text-muted-foreground text-sm text-justify">
                {movie.description}
              </p>
              <div className="text-sm flex flex-wrap items-center gap-1">
                <span className="text-muted-foreground">Genre:</span>
                {movie.genres.map((genre) => (
                  <Badge key={`manga-${movie.id}-genre-${genre.id}`}>
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </TopicsLayout>
  );
}
