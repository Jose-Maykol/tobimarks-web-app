import { Avatar, Card, CardBody } from '@heroui/react'

import { useUserStore } from '../stores/useUserStore'

const UserProfileInfo = () => {
  const { user } = useUserStore()

  return (
    <Card className='border-none bg-content1 shadow-md h-full rounded-md'>
      <CardBody className='p-6 flex flex-col items-center justify-center gap-4 text-center'>
        <Avatar
          src={user?.avatarUrl || ''}
          name={user?.displayName ? user.displayName.charAt(0).toUpperCase() : ''}
          className='w-28 h-28 text-large'
          color='primary'
          isBordered
        />
        <div className='flex flex-col gap-1 mt-2'>
          <h2 className='text-2xl font-bold'>{user?.displayName || 'Cargando...'}</h2>
          <p className='text-sm text-default-600 dark:text-default-500'>{user?.email || 'N/A'}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default UserProfileInfo
