import { DB } from "../../../shared/types";

export default function GetDB(db: DB) {
  return `https://raw.githubusercontent.com/aditeyaS/trendinggg/main/db/${db}.json`;
}
