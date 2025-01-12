import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { AnimeResponse } from "../../../../../../shared/types";
import GetDB from "@/config/get-db";
import TopicsLayout from "../layout";
import { Badge } from "@/components/ui/badge";

export default function Anime() {
  const [animeResponse, setAnimeResponse] = useState<AnimeResponse>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("anime"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setAnimeResponse(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Anime"
      sourceText="jikan.moe"
      sourceLink="https://jikan.moe/"
    >
      <div className="flex flex-col gap-5">
        {animeResponse?.data.map((anime, index) => (
          <a
            key={anime.id}
            href={anime.url}
            target="_blank"
            className="relative  flex items-start border p-5 rounded gap-4 hover:border-primary"
          >
            <h1 className="absolute bg-primary p-1 rounded">#{index + 1}</h1>
            <img className="h-full" src={anime.image} />
            <div className="flex flex-col space-y-2">
              <span className="text-xl flex items-center gap-1">
                {anime.title}
                <span className="text-muted-foreground font-light">
                  ({anime.title_japanese})
                </span>
                <ExternalLink className="w-3 hidden " />
              </span>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {anime.rating}
                </span>
              </div>
              <p className="text-muted-foreground text-sm text-justify">
                {anime.description}
              </p>
              <div className="text-sm flex flex-wrap items-center gap-1">
                <span className="text-muted-foreground">Genre:</span>
                {anime.genres.map((genre) => (
                  <Badge key={`anime-${anime.id}-genre-${genre.id}`}>
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
