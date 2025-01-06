import {
  Bitcoin,
  Book,
  BookUser,
  Clapperboard,
  Laugh,
  Music,
  Swords,
  Tv,
  Wallet,
} from "lucide-react";
import React from "react";

interface Topic {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const topics: Topic[] = [
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
    name: "Music",
    path: "/music",
    icon: <Music />,
  },
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
    name: "Meme Templates",
    path: "/meme-templates",
    icon: <Laugh />,
  },
  {
    name: "Book",
    path: "book",
    icon: <Book />,
  },
  {
    name: "Crypto",
    path: "crypto",
    icon: <Bitcoin />,
  },
  {
    name: "Stock",
    path: "stock",
    icon: <Wallet />,
  },
];

export default topics;
