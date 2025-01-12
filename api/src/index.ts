import "dotenv/config";
import Movie from "./topics/movie";
import Tv from "./topics/tv";
import Music from "./topics/music";
import Anime from "./topics/anime";
import Manga from "./topics/manga";

// https://www.colourlovers.com/api

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
  }
  console.log("Complete");
}

main();
