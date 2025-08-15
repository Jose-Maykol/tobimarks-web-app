import type { JSX } from 'react'
import { Outlet } from 'react-router'

import Header from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const MainLayout = (): JSX.Element => (
  <div className='min-h-screen bg-background'>
    <Header />
    <Sidebar />
    <main className='p-6 ml-64'>
      <Outlet />
    </main>
  </div>
)

export default MainLayout
