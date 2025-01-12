import { BaseResponse } from "./base";
import { RootResponse } from "./root";

export interface Manga extends BaseResponse {
  title_english?: string;
  title_japanese: string;
  rating: string;
  genres: { id: number; name: string }[];
}

export interface MangaResponse extends RootResponse<Manga> {}
