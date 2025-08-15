import { Route, Routes } from 'react-router'

import MainLayout from './core/layouts/MainLayout'
import HomePage from './features/home/pages/homepage/HomePage'

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
