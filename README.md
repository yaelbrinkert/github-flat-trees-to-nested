# github-flat-trees-to-nested

Transform a flat file tree from the GitHub REST API into a properly structured nested format — easily consumable for UIs or filesystem-like processing.

[![NPM version](https://img.shields.io/npm/v/github-flat-trees-to-nested.svg)](https://www.npmjs.com/package/github-flat-trees-to-nested)
[![Weekly Downloads](https://img.shields.io/npm/dw/github-flat-trees-to-nested.svg)](https://www.npmjs.com/package/github-flat-trees-to-nested)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## ✨ Features

- Converts GitHub's flat `tree` structure into:
  - Nested arrays (ideal for rendering UIs like file explorers from Shadcn)
  - Nested objects (if preferred for logic)
- Compatible with GitHub REST API `GET /repos/:owner/:repo/git/trees/:tree_sha`
- TypeScript support out of the box
- Zero dependencies outside of GitHub's API tooling

---

## 🍜 Boilerplate

You can try and install a boiler plate, using Vite + React + TS & github-flat-trees-to-nested.

Access demo here : https://yaelbrinkert.github.io/github-flat-trees-to-nested/

Install boilerplate doing :

```
git clone https://github.com/yaelbrinkert/github-flat-trees-to-nested.git
cd github-flat-trees-to-nested/boilerplate
npm install
npm run dev
```

This way, you'll have a working demo !

---

## 📦 Installation

```bash
npm install github-flat-trees-to-nested
```

## 🔧 Usage

Import one of the builders:

```
import {
  buildNestedArray,
  buildNestedObject,
  buildNestedArraysShadcn,
} from "github-flat-trees-to-nested";
```

Example input from GitHub API:

GitHub returns a flat list of files and folders:

```
{
  "tree": [
    { "path": ".gitignore", "type": "blob" },
    { "path": "README.md", "type": "blob" },
    { "path": "chapter_1", "type": "tree" },
    { "path": "chapter_1/season_1", "type": "tree" },
    { "path": "chapter_1/season_1/1_11", "type": "tree" },
    { "path": "chapter_1/season_1/1_11/1_11.jpg", "type": "blob" },
    { "path": "chapter_1/season_1/1_11/1_11.json", "type": "blob" }
  ]
}
```

Output using `buildNestedArray()`

```
const result = buildNestedArray(flatTree);
console.log(result);
```

```
[
  ".gitignore",
  "README.md",
  ["chapter_1", [
    ["season_1", [
      ["1_11", [
        "1_11.jpg",
        "1_11.json"
      ]]
    ]]
  ]]
]
```

## 📚 API Reference

`buildNestedArray(flatTree: GithubTree): NestedArrayItem[]`
Returns a tree structure in nested array format.

`buildNestedObject(flatTree: GithubTree): { [key: string]: any }`
Returns a nested object format (keys are folder names, leaves are filenames).

`buildNestedArraysShadcn(flatTree: GithubTree): { label: string, children?: any[] }[]`
Returns a format ideal for libraries like shadcn/ui or Radix UI.

## 🧪 Tests

`npm run test`

Tested with Vitest

## 📄 License

ISC - Yael BRINKERT
