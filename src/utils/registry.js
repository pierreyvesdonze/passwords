export const registry = {
  ls: (args, currentPath, setCurrentPath, levelData) => {
    const node = getNode(levelData.fileSystem, currentPath);
    if (!node || node.type !== "dir") return "Not a directory";

    const files = Object.keys(node.children);

    if (args[0] === "-la" || args[0] === "-al" || args[0] === "--all") {
      return files.join("  ");
    }

    // ls simple : on filtre les fichiers cachés
    const visible = files.filter((name) => !name.startsWith("."));
    return visible.join("  ");
  },

  ll: (args, currentPath, setCurrentPath, levelData) => {
    const node = getNode(levelData.fileSystem, currentPath);
    if (!node || node.type !== "dir") return "Not a directory";
    return Object.keys(node.children).join("  "); // équivalent à ls -la
  },

  cd: (args, currentPath, setCurrentPath, levelData) => {
    const target = args[0];
    if (!target) return "Missing argument";

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

    if (target.startsWith("./")) {
      const clean = target.replace("./", "");
      parts.push(clean);
    } else if (target.startsWith("../")) {
      parts.pop();
      const clean = target.replace("../", "");
      parts.push(clean);
    } else {
      parts.push(target);
    }

    const newPath = "/" + parts.join("/");
    const node = getNode(levelData.fileSystem, newPath);

    if (!node || node.type !== "dir") return "Not a directory";

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
    localStorage.clear();
    return "Session cleared. Votre progression est réinitialisée.";
  },

  help: () => {
    return `Commandes disponibles :

  help
    Affiche cette liste d'aide.

  ls
    Liste le contenu du dossier courant.

  ls -la
    Liste détaillée (+ fichiers cachés).

  cd <dossier>
    Change de dossier. Exemples :
      cd dossier
      cd .. (retour en arrière)
      cd /
      cd ./truc
      cd ../autre

  cat <fichier>
    Affiche le contenu d’un fichier.

  reset
    Réinitialise toute la progression.

Notes :
  - Les chemins fonctionnent comme sous Linux.
  - Certaines commandes peuvent être bloquées selon le niveau.
  - Explore, fouille, lis les fichiers… trouve le mot de passe.`;
  },
};

// ----- helper -----
function getNode(fs, path) {
  const parts = path.split("/").filter(Boolean);
  let node = fs["/"];
  for (const p of parts) {
    if (!node.children[p]) return null;
    node = node.children[p];
  }
  return node;
}
