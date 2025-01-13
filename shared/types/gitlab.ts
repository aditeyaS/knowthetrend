import { BaseResponse } from "./base";
import { RootResponse } from "./root";

export interface Gitlab extends BaseResponse {
  namespace: string;
  project: string;
  //   language: string;
  //   languageColor: string;
  stars: string;
  forks: string;
  mergeRequests: string;
  issues: string;
  //   starsToday: string;
  topics: { name: string; url: string }[];
}

export interface GitlabResponse extends RootResponse<Gitlab> {}
