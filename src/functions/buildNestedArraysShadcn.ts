export function buildNestedArraysShadcn(files: { path: string }[]) {
  const root: any[] = [];

  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length + 1;

      // Vérifie si l'élément existe déjà
      let existing = current.find(
        (item) => Array.isArray(item) && item[0] === part
      );

      if (!existing) {
        if (isLast) {
          current.push(part); // Fichier
        } else {
          const newDir: any[] = [part]; // Nouveau dossier
          current.push(newDir);
          current = newDir;
        }
      } else {
        current = existing;
      }
    }
  }

  return root;
}
