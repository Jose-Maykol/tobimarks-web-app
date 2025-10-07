export const COLORS_MAP = {
  red: { background: 'bg-red-500', border: 'border-red-500' },
  orange: { background: 'bg-orange-500', border: 'border-orange-500' },
  amber: { background: 'bg-amber-500', border: 'border-amber-500' },
  yellow: { background: 'bg-yellow-500', border: 'border-yellow-500' },
  lime: { background: 'bg-lime-500', border: 'border-lime-500' },
  green: { background: 'bg-green-500', border: 'border-green-500' },
  emerald: { background: 'bg-emerald-500', border: 'border-emerald-500' },
  teal: { background: 'bg-teal-500', border: 'border-teal-500' },
  cyan: { background: 'bg-cyan-500', border: 'border-cyan-500' },
  sky: { background: 'bg-sky-500', border: 'border-sky-500' },
  blue: { background: 'bg-blue-500', border: 'border-blue-500' },
  indigo: { background: 'bg-indigo-500', border: 'border-indigo-500' },
  violet: { background: 'bg-violet-500', border: 'border-violet-500' },
  purple: { background: 'bg-purple-500', border: 'border-purple-500' },
  fuchsia: { background: 'bg-fuchsia-500', border: 'border-fuchsia-500' },
  pink: { background: 'bg-pink-500', border: 'border-pink-500' },
  rose: { background: 'bg-rose-500', border: 'border-rose-500' },
  stone: { background: 'bg-stone-500', border: 'border-stone-500' },
} as const

export type ColorKey = keyof typeof COLORS_MAP
