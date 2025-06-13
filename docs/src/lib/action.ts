import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "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",
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
