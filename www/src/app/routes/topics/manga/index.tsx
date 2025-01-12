import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { MangaResponse } from "../../../../../../shared/types";
import GetDB from "@/config/get-db";
import TopicsLayout from "../layout";

export default function Manga() {
  const [mangaResponse, setMangaResponse] = useState<MangaResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("manga"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setMangaResponse(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Manga"
      sourceText="jikan.moe"
      sourceLink="https://jikan.moe/"
    >
      <div className="flex flex-col gap-2">
        {mangaResponse?.data.map((manga) => (
          <div
            key={manga.id}
            className="group flex items-start border p-2 rounded gap-4 hover:border-primary"
          >
            <img className="w-24" src={manga.image} />
            <div className="flex flex-col space-y-1">
              <a
                className="text-xl flex items-center gap-1 hover:underline underline-offset-4"
                href={manga.url}
                target="_blank"
              >
                {manga.title}
                <span className="text-muted-foreground font-light">
                  ({manga.title_english})
                </span>
                <ExternalLink className="w-3 hidden group-hover:block" />
              </a>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {manga.rating}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {manga.description}
              </p>

              <div className="text-sm flex gap-1">
                <span className="text-muted-foreground underline">Genre:</span>
                {manga.genres.map((genre) => (
                  <span key={`anime-${manga.id}-genre-${genre.id}`}>
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
