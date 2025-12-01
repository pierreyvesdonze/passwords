export const registry = {
  ls: (args, currentPath, setCurrentPath, levelData) => {
    const node = getNode(levelData.fileSystem, currentPath);
    if (!node || node.type !== "dir") return "Not a directory";
    return Object.keys(node.children).join("  ");
  },

  cd: (args, currentPath, setCurrentPath, levelData) => {
    const target = args[0];
    if (!target) return "Missing argument";

    // Normalisation du path courant
    let parts = currentPath.split("/").filter(Boolean);

    if (target === "/") {
      setCurrentPath("/");
      return "";
    }

    if (target === "..") {
      parts.pop();
      const newPath = "/" + parts.join("/");
      setCurrentPath(newPath === "//" ? "/" : newPath);
      return "";
    }

    // Gestion de "./"
    if (target.startsWith("./")) {
      const clean = target.replace("./", "");
      parts.push(clean);
    }

    // Gestion de "../x"
    else if (target.startsWith("../")) {
      parts.pop();
      const clean = target.replace("../", "");
      parts.push(clean);
    }

    // Sinon : cd dossier
    else {
      parts.push(target);
    }

    const newPath = "/" + parts.join("/");

    // Vérifie que ça existe dans le filesystem
    const node = getNode(levelData.fileSystem, newPath);
    if (!node || node.type !== "dir") {
      return "Not a directory";
    }

    setCurrentPath(newPath);
    return "";
  },

  cat: (args, currentPath, setCurrentPath, levelData) => {
    if (!args[0]) return "Missing file name";
    const path = args[0].startsWith("/")
      ? args[0]
      : currentPath + "/" + args[0];
    const node = getNode(levelData.fileSystem, path);
    if (!node || node.type !== "file") return `No such file: ${args[0]}`;
    return node.content || "(empty file)";
  },

  reset: () => {
    localStorage.clear(); // supprime tout ce qui est dans la session
    return "Session cleared. Votre progression est réinitialisée.";
  },

  help: () => {
    return `Commandes disponibles :

  help
    Affiche cette liste d'aide et explique chaque commande.

  ls
    Liste le contenu du dossier courant (fichiers et dossiers).

  cd <dossier>
    Change de dossier. Exemples :
      cd dossier
      cd .. (revenir en arrière)
      cd /
      cd ./truc
      cd ../autre

  cat <fichier>
    Affiche le contenu d’un fichier.

Notes :
  - Les chemins fonctionnent comme sous Linux.
  - Certaines commandes peuvent être bloquées selon le niveau.
  - Explore, fouille, lis les fichiers… trouve le mot de passe, qui te mènera au suivant.`;
  },
};

// helper pour parcourir le filesystem
function getNode(fs, path) {
  const parts = path.split("/").filter(Boolean);
  let node = fs["/"];
  for (const p of parts) {
    if (!node.children[p]) return null;
    node = node.children[p];
  }
  return node;
}
