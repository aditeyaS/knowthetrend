import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Share } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  sourceText: string;
  sourceLink: string;
}

export default function TopicsLayout({
  title = "",
  sourceText,
  sourceLink,
  ...props
}: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    function back(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        navigate("/");
      }
    }
    document.addEventListener("keydown", back);
    return () => document.removeEventListener("keydown", back);
  }, []);

  async function handleShare() {
    const data: ShareData = {
      title: `Trending ${title}`,
      url: window.location.href,
    };
    if (navigator.canShare(data)) {
      try {
        await navigator.share(data);
      } catch (e) {
        console.log(e);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Success",
        description: "Link copied to clipboard",
      });
    }
  }

  return (
    <>
      <title>{title ? `${title} | Trendinggg` : "Trendinggg"}</title>
      <meta name="description" content={`Trending ${title}`} />
      <div className="">
        <div className="fixed left-0 right-0 z-20 bg-background">
          <div className="h-4" />
          <header className="rounded-t-xl flex justify-between items-center py-2 bg-primary pl-20 pr-20">
            <div className="flex items-center gap-2">
              <Link to={"/"}>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <ArrowLeft />
                </Button>
              </Link>
              <h1 className="tracking-wider font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={"ghost"} size={"icon"} onClick={handleShare}>
                <Share />
              </Button>
              <ModeToggle />
            </div>
          </header>
        </div>
        <div className="h-24 " />
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
    </>
  );
}
