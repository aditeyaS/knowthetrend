import Anime from "./anime";
import Github from "./github";
import Gitlab from "./gitlab";
import Manga from "./manga";
import Movie from "./movie";
import Music from "./music";
import Tv from "./tv";

export async function topics() {
  const functions: { name: string; func: () => Promise<void> }[] = [
    { name: "Anime", func: Anime },
    { name: "Manga", func: Manga },
    { name: "Movie", func: Movie },
    { name: "Tv", func: Tv },
    { name: "Music", func: Music },
    { name: "Github", func: Github },
    { name: "Gitlab", func: Gitlab },
  ];
  const errors: { name: string; error: unknown }[] = [];
  for (const { name, func } of functions) {
    try {
      await func();
      console.log(`✅ ${name}`);
    } catch (error) {
      console.error(`❌ ${name}`);
      errors.push({ name, error });
    }
  }
  if (errors.length > 0) {
    throw new Error("Some scraping functions failed. Check logs for details.");
  }
}
