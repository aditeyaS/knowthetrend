type DB = "movie" | "tv" | "music";

export default function GetDB(db: DB) {
  return `https://raw.githubusercontent.com/aditeyaS/knowthetrend/main/db/${db}.json`;
}
