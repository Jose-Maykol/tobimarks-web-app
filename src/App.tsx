import { Route, Routes } from 'react-router'

import HomePage from './assets/features/home/pages/homepage/HomePage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App
