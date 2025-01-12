function genEnv(key: string) {
  const apiKey = process.env[key];
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `${key} is missing in .env. Will skip api's related with it.`
      );
    } else {
      throw new Error(`❌ ${key} not found in the environment`);
    }
  }
  return apiKey;
}

export const TMDB_API_KEY = () => {
  return genEnv("TMDB_API_KEY");
};

export const LAST_FM_API_KEY = () => {
  return genEnv("LAST_FM_API_KEY");
};
