import { createBrowserRouter } from "react-router";
import Landing from "./landing";
import NotFound from "./not-found";
import Movie from "./topics/movie";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
