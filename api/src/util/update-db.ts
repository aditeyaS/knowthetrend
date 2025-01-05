import fs from "fs/promises";

type DB = "movie" | "tv" | "music";

export default async function UpdateDB(db: DB, jsonString: string) {
  const path = `../db/${db}.json`;
  await fs.writeFile(path, jsonString, "utf-8");
  console.log("✅ Updated: ", db);
}
