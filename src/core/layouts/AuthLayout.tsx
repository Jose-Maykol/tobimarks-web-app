import { type JSX, useEffect } from 'react'
import { Outlet } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import TagService from '../../features/tags/services/tagService'
import { useTagStore } from '../../features/tags/stores/useTagStore'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const AuthLayout = (): JSX.Element => {
  const setTags = useTagStore((state) => state.set)

  const query = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (query.data) {
      setTags(query.data)
    }
  }, [query.data, setTags])

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
