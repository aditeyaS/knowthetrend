import "dotenv/config";
import Movie from "./topics/movie";
import Tv from "./topics/tv";
import Music from "./topics/music";
import Anime from "./topics/anime";
import Manga from "./topics/manga";

async function main() {
  console.log("Start");
  await Movie();
  await Tv();
  await Music();
  await Anime();
  await Manga();
  console.log("Complete");
}

main();
