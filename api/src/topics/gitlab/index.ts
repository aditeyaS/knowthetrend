import * as cheerio from "cheerio";
import { GitlabResponse, Gitlab as IGitlab } from "@shared/types";
import UpdateDB from "@/utils/update-db";

export default async function Gitlab() {
  const response = await fetch("https://gitlab.com/explore/projects/trending");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const html = await response.text();
  let gitlabList: IGitlab[] = [];
  const $ = cheerio.load(html);
  const $projects = $("li.project-row");
  $projects.each((index, element) => {
    const $project = $(element);
    const image = $project.find("div.project-cell a.project img").attr("src");

    const $details = $project.find("div.project-details");
    const $title = $details.find("h2 a");
    const namespace = $title
      .find("span.namespace-name")
      .text()
      .trim()
      .replace(/\n/g, "");
    const project = $title.find("span.project-name").text().trim();
    const url = $title.attr("href");
    const description = $details.find("div.description p").text().trim();
    const topics: { name: string; url: string }[] = [];
    $details
      .find("div[data-testid='project_topic_list'] a")
      .each((_, topicElement) => {
        const $topic = $(topicElement);
        const topicName = $topic.find("span.gl-badge-content").text().trim();
        const topicLink = $topic.attr("href");
        topics.push({ name: topicName, url: `https://gitlab.com${topicLink}` });
      });

    const $controls = $project.find("div.project-cell.project-controls");
    const stars = $controls.find("a.stars").text().trim();
    const forks = $controls.find("a.forks").text().trim();
    const mergeRequests = $controls.find("a.merge-requests").text().trim();
    const issues = $controls.find("a.issues").text().trim();
    gitlabList.push({
      id: index.toString(),
      title: `${namespace}${project}`,
      image: image ? `https://gitlab.com${image}` : "",
      description,
      namespace,
      project: project,
      url: `https://gitlab.com${url}`,
      stars,
      forks,
      mergeRequests,
      issues,
      topics,
    });
  });
  const apiResponse: GitlabResponse = {
    last_updated: new Date().toISOString(),
    data: gitlabList,
  };
  await UpdateDB("gitlab", apiResponse);
}
