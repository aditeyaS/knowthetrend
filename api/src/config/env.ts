export const TMDB_API_KEY = (): string => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("❌ TMDB_API_KEY environment variable is not set.");
  }
  return apiKey;
};

export const LAST_FM_API_KEY = (): string => {
  const apiKey = process.env.LAST_FM_API_KEY;
  if (!apiKey) {
    throw new Error("❌ LAST_FM_API_KEY environment variable is not set.");
  }
  return apiKey;
};
