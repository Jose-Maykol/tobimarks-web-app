import type { JSX } from 'react'

import GoogleLoginButton from './GoogleLoginButton'

const LoginForm = (): JSX.Element => {
  return (
    <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 z-10 transition-all duration-1000 ease-out animate-in fade-in slide-in-from-left-10 fill-mode-forwards'>
      <div className='w-full max-w-[380px] space-y-12'>
        <div className='space-y-4'>
          <h1 className='text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1]'>
            Bienvenido de nuevo a <br />
            <span className='text-primary'>Tobimarks</span>
          </h1>
          <p className='text-[#8b949e] text-lg font-medium tracking-wide'>
            Tu centro de mando para guardar, organizar y encontrar cualquier enlace al instante.
          </p>
        </div>

        <div className='pt-8 space-y-10'>
          <div className='w-full drop-shadow-md relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500'></div>
            <div className='relative'>
              <GoogleLoginButton />
            </div>
          </div>

          <div className='relative flex items-center justify-center'>
            <div className='absolute w-full h-px bg-white/[0.04]'></div>
            <div className='relative bg-[#101217] px-5 py-1.5 rounded-full flex items-center gap-0 border border-[#1d2027]/50 shadow-sm'>
              <span className='text-[10px] font-bold tracking-[0.15em] text-[#5b6471] uppercase'>
                Acceso Seguro
              </span>
            </div>
          </div>

          <p className='text-sm text-[#5b6471] text-center font-medium px-2'>
            Al continuar, aceptas los{' '}
            <a
              href='#'
              className='text-primary/80 hover:text-primary transition-colors font-semibold underline-offset-4 decoration-primary/30'
            >
              Términos
            </a>{' '}
            y la{' '}
            <a
              href='#'
              className='text-primary/80 hover:text-primary transition-colors font-semibold underline-offset-4 decoration-primary/30'
            >
              Política de Privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
