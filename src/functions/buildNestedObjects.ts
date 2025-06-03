import { GithubTree, NestedObjectItem, Tree } from "../classes/GithubTree";
import { isFileOrFolder } from "./globals";

// To build an object tree, adapted for Github and giving all metadatas
export function buildNestedObject(flatTree: GithubTree): NestedObjectItem[] {
  const tree: NestedObjectItem[] = [];

  flatTree.tree.map((fl: Tree) => {
    const path = fl.path;
    const parts = path.split("/");

    parts.forEach((part: string, i: number) => {
      const itemPath = part;
      const fullPath = parts.slice(0, i + 1).join("/");
      const parent = parts[i - 1];
      const children = parts[i + 1];

      let existing = tree.find((item) => item.fullPath === fullPath);

      const type = i === parts.length - 1 ? isFileOrFolder(part, fl) : "folder";
      if (existing) {
        if (!existing.parent && parent) {
          existing.parent = parent;
        }
        if (children) {
          if (!existing.children) existing.children = [];
          if (!existing.children.includes(children)) {
            existing.children.push(children);
          }
        }
      } else {
        tree.push({
          fullPath,
          itemPath,
          parent: parent || undefined,
          children: children ? [children] : undefined,
          type: type,
        });
      }
    });
  });

  return tree;
}
