const KNOWN_EXTENSIONS = [
  "js",
  "ts",
  "json",
  "md",
  "html",
  "css",
  "jsx",
  "tsx",
  "png",
  "jpg",
  "jpeg",
  "svg",
  "gif",
  "pdf",
  "txt",
  "xml",
  "yml",
  "yaml",
  "env",
  "log",
  "csv",
  "zip",
  "gz",
  "tar",
  "mp4",
  "mp3",
  "mov",
  "avi",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "sh",
  "bat",
  "exe",
  "wasm",
];

const FILES_WITHOUT_EXTENSION = [
  "Dockerfile",
  "Makefile",
  "LICENSE",
  "README",
  ".gitignore",
  ".env",
];

// function hasKnownExtension(filename: string): boolean {
function hasKnownExtension(filename) {
  const parts = filename.split(".");
  if (parts.length < 2) return false;
  const ext = parts[parts.length - 1].toLowerCase();
  return KNOWN_EXTENSIONS.includes(ext);
}

// function isFile(part: string, fl: any): boolean {
function isFile(part, fl) {
  return (
    fl.type === "blob" ||
    hasKnownExtension(part) ||
    FILES_WITHOUT_EXTENSION.includes(part)
  );
}

function isFileOrFolder(part, fl) {
  if (
    fl.type === "blob" ||
    hasKnownExtension(part) ||
    FILES_WITHOUT_EXTENSION.includes(part)
  ) {
    return "file";
  } else {
    return "folder";
  }
}

// To build an object tree, adapted for Github and giving all metadatas
export function buildNestedObject(flatTree) {
  const tree = [];

  flatTree.tree.map((fl) => {
    const path = fl.path;
    const parts = path.split("/");

    parts.forEach((part, i) => {
      const itemPath = part;
      const fullPath = parts.slice(0, i + 1).join("/");
      const parent = parts[i - 1];
      const children = parts[i + 1];

      let existing = tree.find((item) => item.itemPath === itemPath);

      const type = isFileOrFolder(part, fl);
      if (existing) {
        if (!existing.parent && parent) {
          existing.parent = parent;
        }
        if (!existing.children && children) {
          existing.children = children;
        }
      } else {
        tree.push({
          fullPath,
          itemPath,
          parent: parent || undefined,
          children: children || undefined,
          typeof: type,
        });
      }
    });
  });

  return tree;
}

// EXPORT FUNCTION to build a Nested Array from github flat tree (Github API REST - Tree endpoints)
export function buildNestedArray(flatTree) {
  const tree = [];

  flatTree.tree.forEach((fl) => {
    const parts = fl.path.split("/");

    // On reconstruit le chemin progressivement pour suivre la hiérarchie
    let currentLevel = tree;

    parts.forEach((part, i) => {
      let existingFolder = currentLevel.find(
        (item) => Array.isArray(item) && item[0] === part
      );
      // Si c'est le dernier élément = fichier, Si l'entité contient bien au moins un ".", Si son type est de blob
      if (i === parts.length - 1 && isFile(part, fl)) {
        // fichier
        // currentLevel.push({ name: part, ...fl });
        currentLevel.push(part);
      } else {
        if (!existingFolder) {
          const newFolder = [part, []];
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
