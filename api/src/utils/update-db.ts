import fs from "fs/promises";
import { DB } from "@shared/types";

export default async function UpdateDB(db: DB, jsonObject: any) {
  const path = `../db/${db}.json`;
  await fs.writeFile(path, JSON.stringify(jsonObject, null, 2), "utf-8");
}
