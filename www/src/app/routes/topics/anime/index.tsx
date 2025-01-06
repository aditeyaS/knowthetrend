import { useEffect, useState } from "react";
import TopicsLayout from "../layout";
import { Anime as IAnime, ApiResponse } from "./api-response";
import { ExternalLink, Star } from "lucide-react";
import GetDB from "@/config/get-db";

export default function Anime() {
  const [animeList, setAnimeList] = useState<IAnime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("anime"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: ApiResponse = await response.json();
        setAnimeList(jsonData.data);
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
      <div className="flex flex-col gap-2">
        {animeList.map((anime) => (
          <div
            key={anime.mal_id}
            className="group flex border p-2 rounded gap-4 hover:border-primary"
          >
            <img className="w-24" src={anime.images.jpg.image_url} />
            <div className="flex flex-col space-y-1">
              <a
                className="text-xl flex items-center gap-1 hover:underline underline-offset-4"
                href={anime.url}
                target="_blank"
              >
                {anime.title}
                <span className="text-muted-foreground font-light">
                  ({anime.title_japanese})
                </span>
                <ExternalLink className="w-3 hidden group-hover:block" />
              </a>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {anime.score}
                </span>
                <span>{anime.status}</span>
              </div>
              <p className="text-muted-foreground text-sm">{anime.synopsis}</p>

              <div className="text-sm flex gap-1">
                <span className="text-muted-foreground underline">Genre:</span>
                {anime.genres.map((genre) => (
                  <span key={`anime-${anime.mal_id}-genre-${genre.mal_id}`}>
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
