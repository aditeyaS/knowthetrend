import { createBrowserRouter } from "react-router";
import Landing from "./landing";
import NotFound from "./not-found";
import Movie from "./topics/movie";
import Tv from "./topics/tv";
import Music from "./topics/music";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
