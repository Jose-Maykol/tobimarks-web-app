import type { JSX } from 'react'
import { Outlet } from 'react-router'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const MainLayout = (): JSX.Element => {
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
