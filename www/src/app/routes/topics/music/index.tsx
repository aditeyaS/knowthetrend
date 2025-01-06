import { useEffect, useState } from "react";
import TopicsLayout from "../layout";
import { ApiResponse, Track } from "./api-response";
import { ExternalLink, Headphones, Play } from "lucide-react";
import GetDB from "@/config/get-db";
import { getFormattedCount } from "@/lib/get-formatted-count";

export default function Music() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("music"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: ApiResponse = await response.json();
        setTracks(jsonData.tracks.track);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Music"
      sourceText="last.fm"
      sourceLink="https://www.last.fm/home"
    >
      <div className="grid grid-cols-2 gap-2">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="group flex border p-2 rounded gap-4 hover:border-primary"
          >
            <img className="w-24" src={track.image[0]["#text"]} />
            <div className="flex flex-col space-y-1">
              <a
                className="text-xl flex items-center gap-1 hover:underline underline-offset-4"
                href={track.url}
                target="_blank"
              >
                {track.name}
                <ExternalLink className="w-3 hidden group-hover:block" />
              </a>
              <a
                className="hover:underline underline-offset-4 text-primary"
                href={track.artist.url}
                target="_blank"
              >
                {track.artist.name}
              </a>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1">
                  <Play className="w-3" />
                  {getFormattedCount(track.playcount)} plays
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Headphones className="w-3" />
                  {getFormattedCount(track.listeners)} listeners
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TopicsLayout>
  );
}
