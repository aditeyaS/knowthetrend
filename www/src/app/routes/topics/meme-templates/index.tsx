import { useEffect, useState } from "react";
import TopicsLayout from "../layout";
import { ApiResponse, Meme as IMeme } from "./api-response";

export default function MemeTemplates() {
  const [memes, setMemes] = useState<IMeme[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: ApiResponse = await response.json();
        setMemes(jsonData.data.memes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Meme Templates"
      sourceText="imgflip"
      sourceLink="https://imgflip.com/"
    >
      <div className="grid grid-cols-3 gap-2" style={{ gridAutoRows: "1fr" }}>
        {memes.map((meme, index) => (
          <a
            key={index}
            target="_blank"
            href={meme.url}
            className="flex flex-col border p-2 rounded gap-4 text-muted-foreground hover:border-primary hover:text-primary"
          >
            <img
              className="w-full h-full object-cover aspect-video"
              src={meme.url}
              alt={meme.name}
            />
            <span>{meme.name}</span>
          </a>
        ))}
      </div>
    </TopicsLayout>
  );
}
