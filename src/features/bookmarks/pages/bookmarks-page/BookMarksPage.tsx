import { Button, Card, CardBody, Chip } from '@heroui/react'

const BookmarksPage = () => {
  return (
    <div>
      <h1>Bookmarks 🚀🚀🚀</h1>
      <Card className='rounded-md w-full transition-colors'>
        <CardBody className='p-4'>
          <div className='flex items-center gap-4'>
            <div className='flex-shrink-0'>
              <img
                src='https://cdn.oaistatic.com/assets/favicon-l4nq08hd.svg'
                alt='open.ai.com'
                className='w-8 h-8 rounded'
              />
            </div>

            {/* CONTENT */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between'>
                <div className='flex-1 min-w-0'>
                  <h3 className='font-medium text-foreground truncate'>Open.AI</h3>
                  <div className='flex items-center gap-4 mt-1'>
                    <span className='text-sm text-muted-foreground'>open.ai</span>
                    <span className='text-sm text-muted-foreground'>24 accesos</span>
                    <span className='text-sm text-muted-foreground'>Hace 2 horas</span>
                  </div>
                  <div className='flex items-center gap-2 mt-2'>
                    <Chip size='sm' className='text-xs' variant='bordered' color='primary'>
                      IA
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className='flex items-center gap-2 flex-shrink-0'>
              <Button size='sm' variant='light'>
                <svg className='w-4 h-4' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default BookmarksPage
