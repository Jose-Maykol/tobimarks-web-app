import { Route, Routes } from 'react-router'

import MainLayout from './core/layouts/AuthLayout'
import LoginPage from './features/auth/pages/login/components/LoginPage'
import BookmarksPage from './features/bookmarks/pages/bookmarks-page/BookMarksPage'
import HomePage from './features/home/pages/homepage/HomePage'
import TagsPage from './features/tags/pages/TagsPage'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/bookmarks' element={<BookmarksPage />} />
        <Route path='/tags' element={<TagsPage />} />
      </Route>
    </Routes>
  )
}

export default App
