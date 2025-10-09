import { Heart } from 'lucide-react'

interface BookmarkFavoriteButtonProps {
  isFavorite: boolean
  onToggleFavorite: () => void
}

const BookmarkFavoriteButton = ({ isFavorite, onToggleFavorite }: BookmarkFavoriteButtonProps) => {
  return (
    <button
      onClick={onToggleFavorite}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer'
      aria-label='Marcar como favorito'
    >
      <Heart
        className={`size-4 transition-colors duration-150
          ${
            isFavorite
              ? 'text-red-600 fill-red-600 group-hover:text-red-700 group-hover:fill-red-700'
              : 'text-neutral-400 group-hover:text-neutral-50'
          }
        `}
      />
    </button>
  )
}
export default BookmarkFavoriteButton
