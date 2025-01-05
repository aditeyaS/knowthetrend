import "dotenv/config";
import Movie from "./topics/movie";
import Tv from "./topics/tv";
import Music from "./topics/music";

async function main() {
  console.log("Start");
  await Movie();
  await Tv();
  await Music();
  console.log("Complete");
}

main();
