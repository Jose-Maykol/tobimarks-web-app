import { Route, Routes } from 'react-router'

import MainLayout from './core/layouts/AuthLayout'
import LoginPage from './features/auth/pages/login/components/LoginPage'
import BookmarksPage from './features/bookmarks/pages/bookmarks-page/BookMarksPage'
import CollectionsPage from './features/collections/pages/collections-page/CollectionsPage'
import HomePage from './features/home/pages/homepage/HomePage'
import ProfilePage from './features/user/pages/ProfilePage'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/bookmarks' element={<BookmarksPage />} />
        <Route path='/collections' element={<CollectionsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
