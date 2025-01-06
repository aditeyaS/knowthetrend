import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import topics from "@/config/topics";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="flex flex-col">
      <header className="fixed w-full flex justify-between py-1 px-20">
        <Button variant={"ghost"}>
          <TrendingUp /> KTT
        </Button>
        <ModeToggle />
      </header>
      <div className="h-14" />
      <div className="px-20">
        <div className="grid grid-cols-3 gap-2">
          {topics.map((topic) => (
            <Link
              to={topic.path}
              className="h-40 border rounded flex items-center justify-center text-muted-foreground hover:border-primary hover:text-foreground"
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
