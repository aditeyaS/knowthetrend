import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import topics from "@/config/topics";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="flex flex-col px-20">
      <header className="w-full flex justify-between py-1">
        <Button variant={"ghost"}>
          <TrendingUp /> KTT
        </Button>
        <ModeToggle />
      </header>
      <div className="">
        <div className="grid grid-cols-3 gap-2">
          {topics.map((topic) => (
            <Link
              to={topic.path}
              className="p-4 border rounded text-lg flex gap-4 hover:bg-primary"
            >
              {topic.icon}
              {topic.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
