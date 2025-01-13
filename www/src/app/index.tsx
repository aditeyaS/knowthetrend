import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router";
import routes from "./routes";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
      <ScrollToTop />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
