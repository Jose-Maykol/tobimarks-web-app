import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface BookmarkFavoriteButtonProps {
  isFavorite: boolean
  onToggleFavorite: () => void
}

const BookmarkFavoriteButton = ({ isFavorite, onToggleFavorite }: BookmarkFavoriteButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      onClick={onToggleFavorite}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center'
      aria-label='Marcar como favorito'
    >
      <motion.div
        animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`size-4 transition-colors duration-200
            ${
              isFavorite
                ? 'text-red-500 fill-red-500 group-hover:text-red-400 group-hover:fill-red-400'
                : 'text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500'
            }
          `}
        />
      </motion.div>
    </motion.button>
  )
}
export default BookmarkFavoriteButton
