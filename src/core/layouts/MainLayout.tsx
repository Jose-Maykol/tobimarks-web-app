import type { JSX } from 'react'
import { Outlet } from 'react-router'

import Header from '../components/Header'

const MainLayout = (): JSX.Element => (
  <div className='min-h-screen bg-background'>
    <Header />
    <div className='flex'>
      {/* <Sidebar /> */}
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  </div>
)

export default MainLayout
