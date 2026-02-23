import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface BookmarkOpenButtonProps {
  onOpen: () => void
}

const BookmarkOpenButton = ({ onOpen }: BookmarkOpenButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.15, x: 2, y: -2 }}
      whileTap={{ scale: 0.85 }}
      onClick={onOpen}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center'
    >
      <ExternalLink className='size-4 transition-colors duration-150 text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500' />
    </motion.button>
  )
}

export default BookmarkOpenButton
