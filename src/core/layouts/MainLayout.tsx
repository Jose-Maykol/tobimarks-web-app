import { type JSX, useEffect } from 'react'
import { Outlet } from 'react-router'

import { useTagStore } from '../../features/tags/stores/useTagStore'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const MainLayout = (): JSX.Element => {
  //TODO: Usar react-query para manejar el estado de los tags
  const tags = useTagStore((state) => state.tags)
  const getList = useTagStore((state) => state.getList)

  useEffect(() => {
    if (tags.length === 0) {
      console.log('Fetching tags...')
      getList()
    }
  }, [getList, tags.length])

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

export default MainLayout
