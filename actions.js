import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.TOKEN_GITHUB,
});

export async function getRootFoldersFromRepo() {
  try {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",
      {
        owner: "yaelbrinkert",
        repo: "fortnite-archives",
        tree_sha: "main",
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
