import { useEffect, useState } from "react";
import { GitFork, Star } from "lucide-react";
import { GithubResponse } from "@shared/types";
import GetDB from "@/config/get-db";
import TopicsLayout from "../layout";

export default function Github() {
  const [githubResponse, setGithubResponse] = useState<GithubResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("github"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setGithubResponse(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Github"
      sourceText="GitHub"
      sourceLink="https://github.com"
    >
      <div className="flex flex-col gap-5">
        {githubResponse?.data.map((github) => (
          <div
            key={github.id}
            className="relative flex items-start border p-5 rounded gap-4 hover:border-primary"
          >
            <img className="size-12 rounded-full" src={github.image} />
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xl flex items-center gap-1 text-primary">
                <a
                  className="hover:underline underline-offset-4"
                  target="_blank"
                  href={`https://github.com/${github.username}`}
                >
                  {github.username}
                </a>
                /
                <a
                  className="hover:underline underline-offset-4"
                  target="_blank"
                  href={`https://github.com/${github.username}/${github.repo}`}
                >
                  {github.repo}
                </a>
              </span>

              <p className="text-muted-foreground text-sm text-justify">
                {github.description}
              </p>

              <div className="flex items-center text-sm text-muted-foreground justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <div
                      style={{ backgroundColor: github.languageColor }}
                      className="size-3 rounded-full"
                    />
                    {github.language}
                  </span>
                  <a
                    target="_blank"
                    href={`https://github.com/${github.username}/${github.repo}/stargazers`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <Star className="size-4 " />
                    {github.stars}
                  </a>
                  <a
                    target="_blank"
                    href={`https://github.com/${github.username}/${github.repo}/forks`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <GitFork className="size-4 " />
                    {github.forks}
                  </a>
                </div>
                <span className="flex items-center gap-1 text-xs">
                  <Star className="size-3" /> {github.starsToday} stars today
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TopicsLayout>
  );
}
