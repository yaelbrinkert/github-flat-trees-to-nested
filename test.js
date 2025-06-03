import { getRootFoldersFromRepo } from "./actions.js";
import { buildNestedObject, buildNestedArray } from "./transform-to-tree.js";

async function test() {
  const flat_tree = await getRootFoldersFromRepo();
  // const nested_tree = buildNestedObject(flat_tree);
  const nested_tree = buildNestedArray(flat_tree);
  console.log(nested_tree);
}

test();

// on prend les path de chaque objet.
// on split avec "/" pour récupérer chaque dossier ou fichier.
// on définit si c'est un dossier ou un fichier en vérifiant si ça vérifie bien les 3 choses suivantes : si la partie contient bien ".", ce qui suit correspond bien à une extension de fichier, et aucun dossier enfant n'est trouvé
// si c'est un dossier, on l'inscrit dans le tableau et on inscrit ses parents et enfants
// si le dossier est précédé par un "string/", alors on inclut ce précédent en tant que parent (et ce dossier devient donc l'enfant du parent)
// on peut redéfinir le chemin "nested" en retraçant les différents parents/enfants
