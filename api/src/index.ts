import "dotenv/config";
import Movie from "./topics/movie";
import Tv from "./topics/tv";

async function main() {
  console.log("Start");
  await Movie();
  await Tv();
  console.log("Complete");
}

main();
