import {
  Archive,
  Book,
  Bookmark,
  Briefcase,
  Code,
  Folder,
  Globe,
  Heart,
  Image,
  Link,
  Music,
  ShoppingCart,
  Star,
  Tag,
  Video,
} from 'lucide-react'

import type { CollectionColor, CollectionIcon } from '../types/collection.type'

export const COLLECTION_COLORS: Record<
  CollectionColor,
  { bg: string; text: string; lightBg: string }
> = {
  red: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-500/10' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/10' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-500', lightBg: 'bg-amber-500/10' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', lightBg: 'bg-yellow-500/10' },
  lime: { bg: 'bg-lime-500', text: 'text-lime-500', lightBg: 'bg-lime-500/10' },
  green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/10' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', lightBg: 'bg-emerald-500/10' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-500', lightBg: 'bg-teal-500/10' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', lightBg: 'bg-cyan-500/10' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-500', lightBg: 'bg-sky-500/10' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/10' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', lightBg: 'bg-indigo-500/10' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-500', lightBg: 'bg-violet-500/10' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/10' },
  fuchsia: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-500', lightBg: 'bg-fuchsia-500/10' },
  pink: { bg: 'bg-pink-500', text: 'text-pink-500', lightBg: 'bg-pink-500/10' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-500', lightBg: 'bg-rose-500/10' },
  stone: { bg: 'bg-stone-500', text: 'text-stone-500', lightBg: 'bg-stone-500/10' },
}

export const COLLECTION_ICONS: Record<CollectionIcon, typeof Folder> = {
  folder: Folder,
  star: Star,
  heart: Heart,
  bookmark: Bookmark,
  archive: Archive,
  tag: Tag,
  code: Code,
  book: Book,
  music: Music,
  video: Video,
  image: Image,
  link: Link,
  briefcase: Briefcase,
  globe: Globe,
  'shopping-cart': ShoppingCart,
}
