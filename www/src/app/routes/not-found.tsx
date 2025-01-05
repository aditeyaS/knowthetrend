import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <span className="text-9xl font-extrabold text-primary">404</span>
        <span className="text-lg text-muted-foreground">Page not found</span>
        <Link to={"/"}>
          <Button size={"lg"}>Home</Button>
        </Link>
      </div>
    </div>
  );
}
