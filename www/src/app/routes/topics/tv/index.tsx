import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import TopicsLayout from "../layout";
import { ApiResponse, ITv } from "./api-response";
import { getGenre } from "./get-genre";
import GetDB from "@/config/get-db";

export default function Tv() {
  const [series, setSeries] = useState<ITv[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("tv"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: ApiResponse = await response.json();
        setSeries(jsonData.results);
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
      <div className="flex flex-col gap-2">
        {series.map((s) => (
          <div
            key={s.id}
            className="group flex items-start border p-2 rounded gap-4 hover:border-primary"
          >
            <img
              className="w-24"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
            />
            <div className="space-y-1">
              <a
                className="flex items-center gap-1 text-xl hover:underline underline-offset-4"
                target="_blank"
                href={`https://www.themoviedb.org/tv/${s.id}`}
              >
                {s.name}
                {s.original_name !== s.name && (
                  <span className="text-muted-foreground font-light">
                    ({s.original_name})
                  </span>
                )}
                <ExternalLink className="w-3 hidden group-hover:block" />
              </a>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3" /> {s.vote_average.toFixed(1)}
                </span>
                <span>{s.first_air_date}</span>
              </div>
              <p className="text-muted-foreground text-sm">{s.overview}</p>
              <div className="text-sm flex gap-1">
                <span className="text-muted-foreground underline">Genre:</span>
                {s.genre_ids.map((genre) => (
                  <span key={`series-${s.id}-genre-${genre}`}>
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
