import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { TvResponse } from "@shared/types";
import TopicsLayout from "../layout";
import GetDB from "@/config/get-db";
import { Badge } from "@/components/ui/badge";

export default function Tv() {
  const [movieResponse, setSeries] = useState<TvResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("tv"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setSeries(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="TV"
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
                <span>{movie.first_air_date}</span>
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
