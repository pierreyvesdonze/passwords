export const WORDS = [
  "ideologie", "discours", "reseau", "connaissance", "expertise",
  "controle", "alliance", "connexion", "charisme", "statut",
  "position", "richesse", "capital", "argent", "domination", "chef", "pute"
];

export const FINAL = "pouvoir";

export function neighbors8(r, c) {
  return [
    [r-1, c-1],[r-1, c],[r-1, c+1],
    [r,   c-1],         [r,   c+1],
    [r+1, c-1],[r+1, c],[r+1, c+1]
  ];
}

// check prefix among remaining words (case-insensitive)
export function anyWordStartsWith(prefix, remainingWords) {
  if (!prefix) return true;
  const p = prefix.toLowerCase();
  return remainingWords.some(w => w.startsWith(p));
}
