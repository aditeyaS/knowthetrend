import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Landing = lazy(() => import("./landing"));
const NotFound = lazy(() => import("./not-found"));
const Movie = lazy(() => import("./topics/movie"));
const Tv = lazy(() => import("./topics/tv"));
const Music = lazy(() => import("./topics/music"));
const Anime = lazy(() => import("./topics/anime"));
const Manga = lazy(() => import("./topics/manga"));
const Github = lazy(() => import("./topics/github"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/tv",
    element: <Tv />,
  },
  {
    path: "/music",
    element: <Music />,
  },
  {
    path: "/anime",
    element: <Anime />,
  },
  {
    path: "/manga",
    element: <Manga />,
  },
  {
    path: "/github",
    element: <Github />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
