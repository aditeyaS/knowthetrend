import { BaseResponse } from "./base";
import { RootResponse } from "./root";

export interface Anime extends BaseResponse {
  title_english?: string;
  title_japanese: string;
  trailer?: string;
  episodes: number;
  rating: string;
  year?: number;
  genres: { id: number; name: string }[];
}

export interface AnimeResponse extends RootResponse<Anime> {}
