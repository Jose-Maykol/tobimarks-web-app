import { ExternalLink } from 'lucide-react'

interface BookmarkOpenButtonProps {
  onOpen: () => void
}

const BookmarkOpenButton = ({ onOpen }: BookmarkOpenButtonProps) => {
  return (
    <button
      onClick={onOpen}
      className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center transition-transform hover:scale-110 hover:translate-x-0.5 hover:-translate-y-0.5 active:scale-95'
    >
      <ExternalLink className='size-4 transition-colors duration-150 text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500' />
    </button>
  )
}

export default BookmarkOpenButton
