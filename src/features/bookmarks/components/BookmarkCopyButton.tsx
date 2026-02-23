import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'

interface BookmarkCopyButtonProps {
  onCopy: () => void
}

const BookmarkCopyButton = ({ onCopy }: BookmarkCopyButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.85 }}
      onClick={onCopy}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center'
    >
      <Copy className='size-4 transition-colors duration-150 text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500' />
    </motion.button>
  )
}

export default BookmarkCopyButton
