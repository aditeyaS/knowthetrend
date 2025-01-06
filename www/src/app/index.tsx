import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router";
import routes from "./routes";
import { ScrollToTop } from "@/components/scroll-to-top";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
