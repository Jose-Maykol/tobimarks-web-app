import { type JSX, useEffect } from 'react'
import { Outlet } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import TagService from '../../features/tags/services/tagService'
import { useTagStore } from '../../features/tags/stores/useTagStore'
import UserService from '../../features/user/services/userService'
import { useUserStore } from '../../features/user/stores/useUserStore'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const AuthLayout = (): JSX.Element => {
  const setTags = useTagStore((state) => state.set)
  const setUser = useUserStore((state) => state.set)

  const queryTags = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const userProfileQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => UserService.getProfile(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (queryTags.data) {
      setTags(queryTags.data)
    }
  }, [queryTags.data, setTags])

  useEffect(() => {
    if (userProfileQuery.data) {
      setUser(userProfileQuery.data)
    }
  }, [userProfileQuery.data, setUser])

  return (
    <div className='min-h-screen bg-background w-full'>
      <Header />
      <Sidebar />
      <main className='p-6 ml-64 text-foreground'>
        <div className='max-w-6xl mx-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
