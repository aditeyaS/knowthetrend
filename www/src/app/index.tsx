import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router";
import routes from "./routes";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
