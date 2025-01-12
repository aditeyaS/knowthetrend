import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import topics from "@/config/topics";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="flex flex-col">
      <header className="fixed w-full flex justify-between py-2 px-20 bg-primary">
        <Button variant={"ghost"}>
          <TrendingUp /> Trendinggg
        </Button>
        <ModeToggle />
      </header>
      <div className="h-14" />
      <div className="px-20 py-5">
        <div className="grid grid-cols-4 gap-6">
          {topics.map((topic) => (
            <Link
              to={topic.path}
              className="aspect-square border rounded flex items-center justify-center hover:border-primary"
            >
              <div className="flex flex-col items-center gap-2 [&_svg]:size-10">
                {topic.icon}
                <span className="text-2xl font-bold">{topic.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
