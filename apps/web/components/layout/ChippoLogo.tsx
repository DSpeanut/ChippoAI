// Pixel art hippo — 16×16 grid, cell = 2.5 units in a 40×40 viewBox
const CELL = 2.5

const COLORS: Record<string, string> = {
  H: '#9583C2', // body
  E: '#C4B5E8', // ear inner
  W: '#FFFFFF', // eye white
  P: '#2D2040', // pupil
  M: '#B8A8D8', // muzzle
  N: '#6B55A0', // nostril
}

// 16 chars per row
const GRID = [
  '................', //  0
  '...HH.....HH....', //  1  ears top
  '..HHHH....HHHH..', //  2  ears mid
  '..HEEH....HEEH..', //  3  ear inner
  '..HHHH....HHHH..', //  4  ears bottom
  '.HHHHHHHHHHHHHH.', //  5  head top
  'HHHHHHHHHHHHHHHH', //  6  head
  'HHHWWWHHHHWWWHHH', //  7  eyes
  'HHHWPWHHHHWPWHHH', //  8  pupils
  'HHHWWWHHHHWWWHHH', //  9  eyes bottom
  'HHHHHHHHHHHHHHHH', // 10  head
  'HHMMMMMMMMMMHHHH', // 11  muzzle top
  'HHMMNMMMMNMMHHHH', // 12  nostrils (cols 4, 9)
  'HHMMHMMMMHMMHHHH', // 13  smile corners (gaps at 4, 9)
  '.HHHHHHHHHHHHH..', // 14  chin
  '..HHHHHHHHHH....', // 15  chin bottom
]

export function ChippoLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Soft background */}
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#F0FDF9" />

      {GRID.map((row, ri) =>
        Array.from(row).map((ch, ci) => {
          const color = COLORS[ch]
          if (!color) return null
          return (
            <rect
              key={`${ri}-${ci}`}
              x={ci * CELL}
              y={ri * CELL}
              width={CELL}
              height={CELL}
              fill={color}
            />
          )
        })
      )}
    </svg>
  )
}
