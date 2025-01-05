import { createBrowserRouter } from "react-router";
import Landing from "./landing";
import NotFound from "./not-found";
import Movie from "./topics/movie";
import Tv from "./topics/tv";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
