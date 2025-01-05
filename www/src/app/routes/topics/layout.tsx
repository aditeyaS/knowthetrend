import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import topics from "@/config/topics";
import { TrendingUp } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sourceText?: string;
  sourceLink?: string;
}

export default function TopicsLayout({
  sourceText,
  sourceLink,
  ...props
}: Props) {
  return (
    <div className="">
      <div className="fixed bg-background left-0 right-0 px-20">
        <header className="flex justify-between py-1">
          <Link to={"/"}>
            <Button variant={"ghost"}>
              <TrendingUp />
              KTT
            </Button>
          </Link>
          <ModeToggle />
        </header>
        <div className="py-1 flex items-center flex-wrap gap-2">
          {topics.map((topic) => (
            <NavLink to={topic.path} key={topic.path}>
              {({ isActive }) => (
                <Button size={"sm"} variant={isActive ? "default" : "outline"}>
                  {topic.icon} {topic.name}
                </Button>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="h-24" />
      <div className="px-20" {...props} />
      <footer className="py-10 flex justify-center">
        <span className="text-sm text-muted-foreground">
          Source:
          <a href={sourceLink} target="_blank" className="ml-1">
            <Button variant={"link"} className="p-0">
              {sourceText}
            </Button>
          </a>
        </span>
      </footer>
    </div>
  );
}
