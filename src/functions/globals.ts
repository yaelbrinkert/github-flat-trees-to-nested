import { KNOWN_EXTENSIONS, FILES_WITHOUT_EXTENSION } from "../consts/consts";

export function hasKnownExtension(filename: string): boolean {
  const parts = filename.split(".");
  if (parts.length < 2) return false;
  const ext = parts[parts.length - 1].toLowerCase();
  return KNOWN_EXTENSIONS.includes(ext);
}

export function isFile(part: string, fl: any): boolean {
  return (
    fl.type === "blob" ||
    hasKnownExtension(part) ||
    FILES_WITHOUT_EXTENSION.includes(part)
  );
}

export function isFileOrFolder(part: string, fl: any): "file" | "folder" {
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
