import { Copy } from 'lucide-react'

interface BookmarkCopyButtonProps {
  onCopy: () => void
}

const BookmarkCopyButton = ({ onCopy }: BookmarkCopyButtonProps) => {
  return (
    <button
      onClick={onCopy}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center transition-transform hover:scale-110 hover:rotate-6 active:scale-95'
    >
      <Copy className='size-4 transition-colors duration-150 text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500' />
    </button>
  )
}

export default BookmarkCopyButton
