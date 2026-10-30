import { useState } from "react"

// Ein Rohr-Puzzle: Kacheln werden per Klick um 90° gedreht, bis ein
// durchgehender Weg von der Start- zur Ziel-Zelle entsteht. Wird bei jedem
// Mount neu (zufällig) generiert, siehe generateGrid().

type Dir = 0 | 1 | 2 | 3 // 0 = Nord, 1 = Ost, 2 = Süd, 3 = West
type Rotation = 0 | 90 | 180 | 270
type Shape = "straight" | "elbow"
// Laufende Rotation in Grad, nicht auf 0-270 begrenzt: so dreht sich eine
// Kachel beim 4. Klick optisch einen weiteren Viertelkreis im Uhrzeigersinn
// weiter (90 -> 360), statt per Modulo auf 0 zurückzuspringen.
type Tile = { shape: Shape; rotation: number; fixed: boolean }

const GRID_SIZE = 5
const START_ROW = Math.floor(GRID_SIZE / 2)
const END_ROW = Math.floor(GRID_SIZE / 2)
const START_EXTERNAL: Dir = 3 // Eingang von außen: West
const END_EXTERNAL: Dir = 1 // Ausgang nach außen: Ost

// Versatz (Zeile, Spalte) für die vier Richtungen, im Uhrzeigersinn.
const DELTA: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

// Kanonische offene Seiten bei Rotation 0°: straight = Nord+Süd, elbow = Nord+Ost.
const CANONICAL_MASK: Record<Shape, number> = {
  straight: 0b0101,
  elbow: 0b0011,
}

function bit(dir: number) {
  return 1 << dir
}

// Dreht eine Bitmaske aus offenen Richtungen um `steps` × 90° im Uhrzeigersinn.
function rotateMask(mask: number, steps: number) {
  let result = 0
  for (let dir = 0; dir < 4; dir++) {
    if (mask & bit(dir)) {
      result |= bit((dir + steps) % 4)
    }
  }
  return result
}

function openMask(tile: Tile) {
  return rotateMask(CANONICAL_MASK[tile.shape], tile.rotation / 90)
}

// Findet Form + Rotation, die genau die geforderten zwei offenen Seiten ergibt.
function findShapeRotation(targetMask: number): { shape: Shape; rotation: Rotation } {
  const shapes: Shape[] = ["straight", "elbow"]
  for (const shape of shapes) {
    for (const steps of [0, 1, 2, 3] as const) {
      if (rotateMask(CANONICAL_MASK[shape], steps) === targetMask) {
        return { shape, rotation: (steps * 90) as Rotation }
      }
    }
  }
  return { shape: "straight", rotation: 0 }
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE
}

function key(r: number, c: number) {
  return `${r},${c}`
}

function dirBetween(a: [number, number], b: [number, number]): Dir {
  const dr = b[0] - a[0]
  const dc = b[1] - a[1]
  for (let d = 0; d < 4; d++) {
    if (DELTA[d][0] === dr && DELTA[d][1] === dc) return d as Dir
  }
  throw new Error("cells are not adjacent")
}

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Randomisierte DFS mit Backtracking (klassischer Maze-Algorithmus) – findet
// garantiert einen Weg, da das Grid als Graph zusammenhängend ist.
function generatePath(startR: number, startC: number, endR: number, endC: number): [number, number][] {
  const visited = new Set<string>()
  const path: [number, number][] = []

  function dfs(r: number, c: number): boolean {
    visited.add(key(r, c))
    path.push([r, c])
    if (r === endR && c === endC) return true
    for (const d of shuffled([0, 1, 2, 3])) {
      const nr = r + DELTA[d][0]
      const nc = c + DELTA[d][1]
      if (inBounds(nr, nc) && !visited.has(key(nr, nc))) {
        if (dfs(nr, nc)) return true
      }
    }
    path.pop()
    visited.delete(key(r, c))
    return false
  }

  dfs(startR, startC)
  return path
}

function buildGrid(): Tile[][] {
  let path: [number, number][] = []
  for (let attempt = 0; attempt < 20; attempt++) {
    path = generatePath(START_ROW, 0, END_ROW, GRID_SIZE - 1)
    if (path.length >= 6) break
  }

  const grid: Tile[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => {
      const shape: Shape = Math.random() < 0.5 ? "straight" : "elbow"
      const rotation = ([0, 90, 180, 270] as const)[Math.floor(Math.random() * 4)]
      return { shape, rotation, fixed: false }
    })
  )

  path.forEach(([r, c], i) => {
    let targetMask = 0
    targetMask |= bit(i === 0 ? START_EXTERNAL : dirBetween([r, c], path[i - 1]))
    targetMask |= bit(i === path.length - 1 ? END_EXTERNAL : dirBetween([r, c], path[i + 1]))

    const { shape, rotation } = findShapeRotation(targetMask)
    const isEndpoint = i === 0 || i === path.length - 1

    if (isEndpoint) {
      grid[r][c] = { shape, rotation, fixed: true }
    } else {
      // Nie ungedreht einsetzen, sonst startet das Puzzle schon gelöst.
      const scrambleSteps = 1 + Math.floor(Math.random() * 3)
      const scrambledRotation = ((rotation / 90 + scrambleSteps) % 4) * 90
      grid[r][c] = { shape, rotation: scrambledRotation, fixed: false }
    }
  })

  return grid
}

function isConnected(grid: Tile[][]): boolean {
  const visited = new Set<string>()
  const queue: [number, number][] = [[START_ROW, 0]]
  visited.add(key(START_ROW, 0))

  while (queue.length > 0) {
    const [r, c] = queue.shift()!
    const mask = openMask(grid[r][c])
    for (let d = 0; d < 4; d++) {
      if (!(mask & bit(d))) continue
      const nr = r + DELTA[d][0]
      const nc = c + DELTA[d][1]
      if (!inBounds(nr, nc)) continue
      const opposite = (d + 2) % 4
      if (!(openMask(grid[nr][nc]) & bit(opposite))) continue
      const k = key(nr, nc)
      if (!visited.has(k)) {
        visited.add(k)
        queue.push([nr, nc])
      }
    }
  }

  return visited.has(key(END_ROW, GRID_SIZE - 1))
}

// Baut Grids neu, falls Zufall es (extrem selten) schon gelöst anliefert.
function generateGrid(): Tile[][] {
  for (let attempt = 0; attempt < 10; attempt++) {
    const grid = buildGrid()
    if (!isConnected(grid)) return grid
  }
  return buildGrid()
}

function PipeTile({ tile, onClick }: { tile: Tile; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={tile.fixed}
      aria-label={tile.fixed ? "Fixe Rohr-Kachel" : "Rohr-Kachel drehen"}
      className={`flex size-12 items-center justify-center rounded-md border transition sm:size-14 ${
        tile.fixed
          ? "cursor-default border-chart-4/50 bg-neutral-800"
          : "cursor-pointer border-white/10 bg-neutral-800 hover:border-chart-4/60 hover:bg-neutral-700"
      }`}
    >
      <svg
        viewBox="0 0 100 100"
        className="size-8 transition-transform duration-150 sm:size-10"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
      >
        {tile.shape === "straight" ? (
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-neutral-300"
            filter="url(#pipe-metal-texture)"
          />
        ) : (
          <path
            d="M 50 0 L 50 50 L 100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-neutral-300"
            filter="url(#pipe-metal-texture)"
          />
        )}
      </svg>
    </button>
  )
}

export function PipePuzzle({ onSolved }: { onSolved: () => void }) {
  const [grid, setGrid] = useState<Tile[][]>(() => generateGrid())

  function handleTileClick(r: number, c: number) {
    setGrid((prev) => {
      const next = prev.map((row) => [...row])
      const tile = next[r][c]
      // Kein Modulo hier: der Wert wächst unbegrenzt weiter, damit die
      // CSS-Transition immer im Uhrzeigersinn weiterdreht statt zurückzuspringen.
      next[r][c] = { ...tile, rotation: tile.rotation + 90 }
      if (isConnected(next)) onSolved()
      return next
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Nicht sichtbar selbst, definiert nur den Textur-Filter (feTurbulence
          erzeugt Rauschen, feComposite/feBlend schneidet es auf die
          Rohr-Form zu und dunkelt sie fleckig ab) einmal für alle Kacheln,
          die ihn per filter="url(#pipe-metal-texture)" referenzieren. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <filter id="pipe-metal-texture" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.55 0"
              result="noiseAlpha"
            />
            <feComposite in="noiseAlpha" in2="SourceAlpha" operator="in" result="clippedNoise" />
            <feBlend in="SourceGraphic" in2="clippedNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>
      <p className="max-w-xs text-center text-sm text-neutral-300">
        Verbinde die Rohre von links (<span className="text-chart-4">Start</span>) nach
        rechts (<span className="text-chart-4">Ziel</span>), um die Kontaktdaten
        freizuschalten.
      </p>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
      >
        {grid.map((row, r) =>
          row.map((tile, c) => (
            <PipeTile key={key(r, c)} tile={tile} onClick={() => handleTileClick(r, c)} />
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => setGrid(generateGrid())}
        className="text-xs text-neutral-400 underline underline-offset-2 hover:text-chart-4"
      >
        Neu mischen
      </button>
    </div>
  )
}
