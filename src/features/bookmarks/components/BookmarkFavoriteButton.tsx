import { Heart } from 'lucide-react'

interface BookmarkFavoriteButtonProps {
  isFavorite: boolean
  onToggleFavorite: () => void
}

const BookmarkFavoriteButton = ({ isFavorite, onToggleFavorite }: BookmarkFavoriteButtonProps) => {
  return (
    <button
      onClick={onToggleFavorite}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-95'
      aria-label='Marcar como favorito'
    >
      <div className={isFavorite ? 'scale-110' : 'scale-100'}>
        <Heart
          className={`size-4 transition-all duration-200
            ${
              isFavorite
                ? 'text-red-500 fill-red-500 group-hover:text-red-400 group-hover:fill-red-400'
                : 'text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500'
            }
          `}
        />
      </div>
    </button>
  )
}
export default BookmarkFavoriteButton
