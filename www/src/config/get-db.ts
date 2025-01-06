type DB = "movie" | "tv" | "music" | "anime" | "manga";

export default function GetDB(db: DB) {
  return `https://raw.githubusercontent.com/aditeyaS/knowthetrend/main/db/${db}.json`;
}
