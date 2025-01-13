import "dotenv/config";
import Movie from "@/topics/movie";
import Tv from "@/topics/tv";
import Music from "@/topics/music";
import Anime from "@/topics/anime";
import Manga from "@/topics/manga";
import Github from "@/topics/github";
import Gitlab from "./topics/gitlab";

async function main() {
  console.log("Start");
  if (process.env.NODE_ENV === "development") {
    console.log("Dev mode");
  } else {
    await Anime();
    await Manga();
    await Movie();
    await Tv();
    await Music();
    await Github();
    await Gitlab();
  }
  console.log("Complete");
}

main();
