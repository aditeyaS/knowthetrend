import GithubIcon from "@/components/icons/github";
import GitlabIcon from "@/components/icons/gitlab";
import { BookUser, Clapperboard, Swords, Tv } from "lucide-react";
import React from "react";

interface Topic {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const topics: Topic[] = [
  {
    name: "Anime",
    path: "/anime",
    icon: <Swords />,
  },
  {
    name: "Manga",
    path: "/manga",
    icon: <BookUser />,
  },
  {
    name: "Movie",
    path: "/movie",
    icon: <Clapperboard />,
  },
  {
    name: "TV",
    path: "/tv",
    icon: <Tv />,
  },
  {
    name: "Github",
    path: "/github",
    icon: <GithubIcon />,
  },
  {
    name: "Gitlab",
    path: "/gitlab",
    icon: <GitlabIcon />,
  },
  // {
  //   name: "Music",
  //   path: "/music",
  //   icon: <Music />,
  // },
  // {
  //   name: "Meme Templates",
  //   path: "/meme-templates",
  //   icon: <Laugh />,
  // },
  // {
  //   name: "Book",
  //   path: "book",
  //   icon: <Book />,
  // },
  // {
  //   name: "Crypto",
  //   path: "crypto",
  //   icon: <Bitcoin />,
  // },
  // {
  //   name: "Stock",
  //   path: "stock",
  //   icon: <Wallet />,
  // },
];

export default topics;
