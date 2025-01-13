import { BaseResponse } from "./base";
import { RootResponse } from "./root";

export interface Github extends BaseResponse {
  username: string;
  repo: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
  starsToday: string;
}

export interface GithubResponse extends RootResponse<Github> {}
