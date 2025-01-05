export const TMDB_API_KEY = (): string => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("❌ TMDB_API_KEY environment variable is not set.");
  }
  return apiKey;
};
