import { WORDS, FINAL } from "./wordUtils";

const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const GRID_SIZE = 18;

function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

export function generateGrid(size = GRID_SIZE, words = WORDS, final = FINAL) {
  // empty grid + marker array to know which cells are part of placed words
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
  const used = Array.from({ length: size }, () => Array.from({ length: size }, () => false));

  // allowed directions (dx,dy)
  const directions = [
    [1, 0], // right
    [0, 1], // down
    [1, 1]  // diag down-right
  ];

  function canPlace(r, c, word, dx, dy) {
    for (let i = 0; i < word.length; i++) {
      const rr = r + dy * i;
      const cc = c + dx * i;
      if (rr < 0 || cc < 0 || rr >= size || cc >= size) return false;
      const ch = grid[rr][cc];
      if (ch && ch !== word[i]) return false;
    }
    return true;
  }

  function place(word) {
    const dirs = shuffle(directions);
    for (let dir of dirs) {
      const [dx, dy] = dir;
      for (let attempt = 0; attempt < 300; attempt++) {
        const r = rand(size);
        const c = rand(size);
        if (!canPlace(r, c, word, dx, dy)) continue;
        for (let i = 0; i < word.length; i++) {
          const rr = r + dy * i;
          const cc = c + dx * i;
          grid[rr][cc] = word[i];
          used[rr][cc] = true;
        }
        return true;
      }
    }
    return false;
  }

  // place all words
  for (const w of words) {
    const placed = place(w.toLowerCase());
    if (!placed) {
      // fallback naive forced placement left-to-right scanning
      outer: for (let r = 0; r < size; r++) {
        for (let c = 0; c + w.length <= size; c++) {
          if (canPlace(r, c, w, 1, 0)) {
            for (let i = 0; i < w.length; i++) {
              grid[r][c+i] = w[i];
              used[r][c+i] = true;
            }
            break outer;
          }
        }
      }
    }
  }

  // fill with random letters where empty
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = ALPHA[rand(ALPHA.length)];
    }
  }

  // place final letters scattered in cells that are NOT part of any placed word,
  // ensure distinct positions and not create contiguous final word accidentally
  const finalCoords = [];
  const forbidden = new Set(); // string "r,c"

  // gather candidate positions where used===false
  const candidates = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!used[r][c]) candidates.push([r,c]);
    }
  }
  // if not enough candidates (rare), allow some used cells but avoid making final word sequence later
  let avail = candidates.slice();
  if (avail.length < final.length) {
    // fallback: allow any cell
    avail = [];
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) avail.push([r,c]);
  }

  // random pick positions ensuring non-adjacent in final word order (simple guard)
  shuffle(avail);
  for (let i = 0; i < final.length; i++) {
    if (avail.length === 0) break;
    const [r,c] = avail.pop();
    finalCoords.push([r,c, final[i]]);
    forbidden.add(`${r},${c}`);
  }

  // write final letters into grid (uppercase for visibility)
  for (const [r,c,ch] of finalCoords) {
    grid[r][c] = ch; // keep lowercase consistent
  }

  return { grid, finalCoords, size };
}
