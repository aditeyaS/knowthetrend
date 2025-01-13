import { useEffect, useState } from "react";
import { CircleDot, GitFork, GitPullRequestArrow, Star } from "lucide-react";
import { GitlabResponse } from "@shared/types";
import GetDB from "@/config/get-db";
import TopicsLayout from "../layout";
import { Badge } from "@/components/ui/badge";

export default function Gitlab() {
  const [gitlabResponse, setGitlabResponse] = useState<GitlabResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDB("gitlab"));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setGitlabResponse(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TopicsLayout
      title="Gitlab"
      sourceText="Gitlab"
      sourceLink="https://gitlab.com"
    >
      <div className="flex flex-col gap-5">
        {gitlabResponse?.data.map((gitlab) => (
          <div
            key={gitlab.id}
            className="relative flex items-start border p-5 rounded gap-4 hover:border-primary"
          >
            <img className="size-12 rounded-full" src={gitlab.image} />
            <div className="flex flex-col gap-1 w-full">
              <a
                className="text-xl flex items-center text-primary underline-offset-4 hover:underline"
                target="_blank"
                href={gitlab.url}
              >
                <span className="font-thin">{gitlab.namespace}</span>
                <span>{gitlab.project}</span>
              </a>

              <p className="text-muted-foreground text-sm text-justify">
                {gitlab.description}
              </p>

              <div className="flex gap-2 items-center flex-wrap">
                {gitlab.topics.map((topic) => (
                  <a target="_blank" href={topic.url} key={topic.name}>
                    <Badge variant={"secondary"}>{topic.name}</Badge>
                  </a>
                ))}
              </div>

              <div className="flex items-center text-sm text-muted-foreground justify-between">
                <div className="flex items-center gap-3">
                  <a
                    target="_blank"
                    href={`${gitlab.url}/-/starrers`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <Star className="size-4 " />
                    {gitlab.stars}
                  </a>
                  <a
                    target="_blank"
                    href={`${gitlab.url}/-/forks`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <GitFork className="size-4 " />
                    {gitlab.forks}
                  </a>
                  <a
                    target="_blank"
                    href={`${gitlab.url}/-/merge_requests`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <GitPullRequestArrow className="size-4 " />
                    {gitlab.mergeRequests}
                  </a>
                  <a
                    target="_blank"
                    href={`${gitlab.url}/-/issues`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <CircleDot className="size-4 " />
                    {gitlab.issues}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TopicsLayout>
  );
}
