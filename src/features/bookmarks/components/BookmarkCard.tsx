import type { JSX } from 'react'
import { Button, Card, CardBody } from '@heroui/react'

import TagItem from '../../tags/components/TagItem'
import type { BookmarkListItem } from '../types/boomark.type'

interface BookmarkCardProps {
  bookmark: BookmarkListItem
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps): JSX.Element => {
  return (
    <Card className='rounded-md w-full transition-colors px-4 dark:bg-neutral-900'>
      <CardBody className='p-4'>
        <div className='flex items-center gap-4'>
          <div className='flex-shrink-0'>
            <img
              src={bookmark.faviconUrl ?? '/favicon.ico'}
              alt={bookmark.domain}
              className='size-10 rounded'
            />
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between'>
              <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-foreground truncate'>{bookmark.title}</h3>
                <div className='flex items-center gap-4 mt-1'>
                  <span className='text-sm text-muted-foreground'>{bookmark.domain}</span>
                  <span className='text-sm text-muted-foreground'>
                    {bookmark.accessCount} accesos
                  </span>
                  <span className='text-sm text-muted-foreground'>'Nunca'</span>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  {bookmark.tags.map((tag) => (
                    <TagItem key={tag.id} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className='flex items-center gap-2 flex-shrink-0'>
            <Button size='sm' variant='light' isIconOnly>
              <svg className='w-4 h-4' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            </Button>
            <Button size='sm' variant='light' isIconOnly>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
            </Button>
            <Button size='sm' variant='light' isIconOnly>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default BookmarkCard
