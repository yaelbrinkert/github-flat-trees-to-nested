export interface GithubTree {
  sha: string;
  url: string;
  tree: Tree[];
}

export interface Tree {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

// Typage Nested Array
export type NestedArrayItem = FileItem | FolderItem;

// export interface FileItem extends Tree {
//   name: string;
// }

export type FileItem = string;

export type FolderItem = [string, NestedArrayItem[]];

// Typage Nested Object
export interface NestedObjectItem {
  fullPath: string;
  itemPath: string;
  parent?: string | undefined;
  children?: string[] | undefined;
  type: "file" | "folder";
}
