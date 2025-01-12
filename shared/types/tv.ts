import { BaseResponse } from "./base";
import { RootResponse } from "./root";

export interface Tv extends BaseResponse {
  title_original: string;
  rating: string;
  first_air_date: string;
  genres: { id: number; name: string }[];
}

export interface TvResponse extends RootResponse<Tv> {}
