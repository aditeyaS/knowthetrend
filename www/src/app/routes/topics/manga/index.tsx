import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { MangaResponse } from "../../../../../../shared/types";
import GetDB from "@/config/get-db";
import TopicsLayout from "../layout";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex flex-col gap-5">
        {mangaResponse?.data.map((manga, index) => (
          <a
            key={manga.id}
            href={manga.url}
            target="_blank"
            className="relative  flex items-start border p-5 rounded gap-4 hover:border-primary"
          >
            <h1 className="absolute bg-primary p-1 rounded">#{index + 1}</h1>
            <img className="h-full" src={manga.image} />
            <div className="flex flex-col space-y-2">
              <span className="text-xl flex items-center gap-1">
                {manga.title}
                <span className="text-muted-foreground font-light">
                  ({manga.title_japanese})
                </span>
                <ExternalLink className="w-3 hidden " />
              </span>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {manga.rating}
                </span>
              </div>
              <p className="text-muted-foreground text-sm text-justify">
                {manga.description}
              </p>
              <div className="text-sm flex flex-wrap items-center gap-1">
                <span className="text-muted-foreground">Genre:</span>
                {manga.genres.map((genre) => (
                  <Badge key={`manga-${manga.id}-genre-${genre.id}`}>
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
