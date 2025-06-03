import {
  GithubTree,
  Tree,
  NestedArrayItem,
  FolderItem,
} from "../classes/GithubTree";
import { isFile } from "./globals";

// EXPORT FUNCTION to build a Nested Array from github flat tree (Github API REST - Tree endpoints)
export function buildNestedArray(flatTree: GithubTree): NestedArrayItem[] {
  const tree: NestedArrayItem[] = [];

  flatTree.tree.forEach((fl: Tree) => {
    const parts = fl.path.split("/");

    // On reconstruit le chemin progressivement pour suivre la hiérarchie
    let currentLevel: NestedArrayItem[] = tree;

    parts.forEach((part: string, i: number) => {
      const isLast = i === parts.length - 1;
      let existingFolder = currentLevel.find(
        (item): item is FolderItem => Array.isArray(item) && item[0] === part
      );
      // Si c'est le dernier élément = fichier, Si l'entité contient bien au moins un ".", Si son type est de blob
      if (isLast && isFile(part, fl)) {
        // fichier
        // currentLevel.push({ name: part, ...fl });
        currentLevel.push(part);
      } else {
        if (!existingFolder) {
          const newFolder: FolderItem = [part, []];
          currentLevel.push(newFolder);
          currentLevel = newFolder[1]; // descend dans le nouveau
        } else {
          currentLevel = existingFolder[1]; // descend dans l'existant
        }
      }
    });
  });

  return tree;
}
