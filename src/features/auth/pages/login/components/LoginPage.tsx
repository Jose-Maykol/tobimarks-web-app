import type { JSX } from 'react'

import GoogleLoginButton from './GoogleLoginButton'

const LoginPage = (): JSX.Element => {
  return (
    <div className='min-h-screen p-4 relative overflow-hidden'>
      <div className='absolute -top-24 -left-36 h-96 w-96 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-70'></div>
      <div className='absolute top-[calc(50%-260px)] left-[calc(50%-260px)] h-[520px] w-[520px] bg-gradient-to-br from-blue-700 to-purple-500 rounded-full filter blur-3xl opacity-40'></div>
      <div className='absolute -bottom-24 -right-36 h-96 w-96 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-70'></div>

      <div className='relative flex justify-center items-center flex-col h-screen gap-2'>
        <h1 className='text-neutral-100 text-5xl font-bold text-center'>
          Tus bookmarks están a un clic de distancia, <br />{' '}
          <span className='bg-linear-to-r from-violet-500 to-blue-500 bg-clip-text text-6xl text-transparent'>
            Tobimarks
          </span>
        </h1>
        <p className='text-neutral-300 text-center max-w-2xl text-xl font-semibold'>
          El gestor de bookmarks inteligente que convierte el caos de tus enlaces en una biblioteca
          organizada y accesible al instante.
        </p>
        <div>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
