import { describe, it, expect } from "vitest";
import { buildNestedObject } from "../functions/buildNestedObjects";
import { GithubTree } from "../classes/GithubTree";

describe("buildNestedObject", () => {
  it("construit une arborescence simple à partir d’un flat tree", () => {
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

    const result = buildNestedObject(flatTree);

    expect(result).toContainEqual({
      fullPath: "README.md",
      itemPath: "README.md",
      parent: undefined,
      children: undefined,
      type: "file",
    });

    expect(result).toContainEqual({
      fullPath: "src",
      itemPath: "src",
      parent: undefined,
      children: ["index.ts", "utils"],
      type: "folder",
    });

    expect(result).toContainEqual({
      fullPath: "src/index.ts",
      itemPath: "index.ts",
      parent: "src",
      children: undefined,
      type: "file",
    });

    expect(result).toContainEqual({
      fullPath: "src/utils",
      itemPath: "utils",
      parent: "src",
      children: ["helpers.ts"],
      type: "folder",
    });

    expect(result).toContainEqual({
      fullPath: "src/utils/helpers.ts",
      itemPath: "helpers.ts",
      parent: "utils",
      children: undefined,
      type: "file",
    });
  });
});
