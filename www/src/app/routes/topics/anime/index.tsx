import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { AnimeResponse } from "../../../../../../shared/types";
import GetDB from "@/config/get-db";
import TopicsLayout from "../layout";

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
      <div className="grid grid-cols-2 gap-5">
        {animeResponse?.data.map((anime, index) => (
          <div
            key={anime.id}
            className="relative group flex items-start border p-5 rounded gap-4 hover:border-primary"
          >
            <h1 className="absolute bg-primary p-1 rounded">#{index + 1}</h1>
            <img className="w-24" src={anime.image} />
            <div className="flex flex-col space-y-1">
              <a
                className="text-xl flex items-center gap-1 hover:underline underline-offset-4"
                href={anime.url}
                target="_blank"
              >
                {anime.title}
                <span className="text-muted-foreground font-light">
                  ({anime.title_english})
                </span>
                <ExternalLink className="w-3 hidden group-hover:block" />
              </a>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {anime.rating}
                </span>
                {/* <span>{anime.}</span> */}
              </div>
              <p className="text-muted-foreground text-sm">
                {anime.description}
              </p>

              <div className="text-sm flex gap-1">
                <span className="text-muted-foreground underline">Genre:</span>
                {anime.genres.map((genre) => (
                  <span key={`anime-${anime.id}-genre-${genre.id}`}>
                    {genre.name}
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
