import type { JSX } from 'react'

import LoginForm from './components/LoginForm'
import LoginShowcase from './components/LoginShowcase'

const LoginPage = (): JSX.Element => {
  return (
    <div className='flex min-h-screen bg-[#0b0c10] relative overflow-hidden text-white font-sans selection:bg-cyan-500/30'>
      <LoginForm />
      <LoginShowcase />
    </div>
  )
}

export default LoginPage
