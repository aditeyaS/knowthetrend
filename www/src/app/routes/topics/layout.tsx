import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import topics from "@/config/topics";
import { TrendingUp } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function TopicsLayout({ ...props }: Props) {
  return (
    <div className="px-20">
      <div>
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
      <div {...props} />
    </div>
  );
}
