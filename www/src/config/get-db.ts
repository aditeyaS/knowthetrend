type DB = "movie" | "tv";

export default function GetDB(db: DB) {
  return `https://raw.githubusercontent.com/aditeyaS/knowthetrend/main/db/${db}.json`;
}
