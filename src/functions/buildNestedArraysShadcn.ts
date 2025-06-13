import { GithubTree, Tree } from "../classes/GithubTree";

export function buildNestedArraysShadcn(flatTree: GithubTree) {
  const root: any[] = [];

  flatTree.tree.forEach((file: Tree) => {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      // Check if part already exists
      let existing = current.find(
        (item) => Array.isArray(item) && item[0] === part
      );

      if (!existing) {
        if (isLast) {
          current.push(part); // File
        } else {
          const newDir: any[] = [part, []]; // New folder
          current.push(newDir);
          current = newDir[1]; // Go deeper
        }
      } else {
        current = existing[1]; // Go deeper into existing folder
      }
    }
  });

  return root;
}
