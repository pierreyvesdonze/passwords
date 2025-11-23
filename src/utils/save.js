const SAVE_KEY = "lastUnlockedLevel";

// récupère le dernier niveau débloqué, retourne 1 si rien
export function getLastUnlockedLevel() {
  const level = sessionStorage.getItem(SAVE_KEY);
  return level ? Number(level) : 1;
}

// met à jour la progression si le niveau actuel est supérieur
export function updateLastUnlockedLevel(currentLevel) {
  const last = getLastUnlockedLevel();
  if (currentLevel >= last) {
    sessionStorage.setItem(SAVE_KEY, currentLevel);
  }
}
