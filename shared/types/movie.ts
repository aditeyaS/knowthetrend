import { BaseResponse } from "./base";
import { RootResponse } from "./root";

export interface Movie extends BaseResponse {
  title_original: string;
  rating: string;
  release_date: string;
  genres: { id: number; name: string }[];
}

export interface MovieResponse extends RootResponse<Movie> {}
