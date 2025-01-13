import { GithubResponse, Github as IGithub } from "@shared/types";
import fs from "fs/promises";
import * as cheerio from "cheerio";
import UpdateDB from "@/utils/update-db";

export default async function Github() {
  const response = await fetch("https://github.com/trending");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const html = await response.text();
  let githubList: IGithub[] = [];
  const $ = cheerio.load(html);
  const $articles = $("article.Box-row");
  $articles.each((index, element) => {
    const $article = $(element);
    const description = $article.find("p").text().trim();
    const $link = $article.find("h2 > a");
    const fullName = ($link.attr("href") ?? "").slice(1);
    const [username, repo] = fullName.split("/");
    const language = $article
      .find('span[itemprop="programmingLanguage"]')
      .text()
      .trim();
    const languageColor = $article
      .find(".repo-language-color")
      .attr("style")
      ?.match(/background-color:\s*(#[a-fA-F0-9]+)/)?.[1];
    const stars = $article
      .find('a[href*="/stargazers"]')
      .text()
      .trim()
      .replace(/,/g, "");
    const forks = $article
      .find('a[href*="/forks"]')
      .text()
      .trim()
      .replace(/,/g, "");
    const starsToday = $article
      .find("span.float-sm-right")
      .text()
      .trim()
      .match(/(\d+)\s*stars today/)?.[1];
    githubList.push({
      id: index.toString(),
      title: fullName,
      description,
      username,
      repo,
      url: `https://github.com/${username}/${repo}`,
      image: `https://github.com/${username}.png`,
      language,
      languageColor: languageColor || "",
      stars,
      forks,
      starsToday: starsToday || "0",
    });
  });
  const apiResponse: GithubResponse = {
    last_updated: new Date().toISOString(),
    data: githubList,
  };
  await UpdateDB("github", apiResponse);
}
