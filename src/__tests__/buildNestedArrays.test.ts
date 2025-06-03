import { describe, it, expect } from "vitest";
import { buildNestedArray } from "../functions/buildNestedArrays";
import { GithubTree } from "../classes/GithubTree";

describe("buildNestedArray", () => {
  it("construit une arborescence nested à partir d’un flat tree", () => {
    const flatTree: GithubTree = {
      sha: "rootsha",
      url: "https://api.github.com/someurl",
      tree: [
        {
          path: "README.md",
          mode: "100644",
          type: "blob",
          sha: "1",
          url: "url1",
        },
        {
          path: "src/index.ts",
          mode: "100644",
          type: "blob",
          sha: "2",
          url: "url2",
        },
        {
          path: "src/utils/helpers.ts",
          mode: "100644",
          type: "blob",
          sha: "3",
          url: "url3",
        },
      ],
    };

    const result = buildNestedArray(flatTree);

    expect(result).toEqual([
      "README.md",
      ["src", ["index.ts", ["utils", ["helpers.ts"]]]],
    ]);
  });
});
