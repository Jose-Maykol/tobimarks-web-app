import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Sparkles } from 'lucide-react'

import GoogleLoginButton from './GoogleLoginButton'

const LoginPage = (): JSX.Element => {
  return (
    <div className='flex min-h-screen bg-background relative overflow-hidden text-foreground'>
      {/* Lado Izquierdo: Formulario / Contenido de Login */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 z-10'
      >
        <div className='w-full max-w-md space-y-8'>
          <div className='flex items-center gap-2 mb-12'>
            <div className='p-2 bg-primary/10 rounded-xl text-primary'>
              <Bookmark className='w-6 h-6' />
            </div>
            <span className='font-bold text-2xl tracking-tight'>Tobimarks</span>
          </div>

          <div className='space-y-4'>
            <h1 className='text-4xl lg:text-5xl font-extrabold tracking-tight'>
              Bienvenido de <br />
              <span className='text-primary'>vuelta</span>
            </h1>
            <p className='text-default-500 text-lg'>
              El gestor inteligente que convierte el caos de tus enlaces en una biblioteca
              organizada y accesible al instante.
            </p>
          </div>

          <div className='pt-10'>
            <div className='flex flex-col items-center justify-center'>
              <div className='w-full'>
                <GoogleLoginButton />
              </div>
              <p className='text-xs text-default-400 text-center mt-8 max-w-xs'>
                Al continuar, aceptas nuestros{' '}
                <a
                  href='#'
                  className='text-foreground hover:text-primary transition-colors hover:underline'
                >
                  Términos de servicio
                </a>{' '}
                y nuestra{' '}
                <a
                  href='#'
                  className='text-foreground hover:text-primary transition-colors hover:underline'
                >
                  Política de privacidad
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lado Derecho: Imagen abstracta / Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className='hidden lg:flex w-1/2 relative bg-primary/5 items-center justify-center p-12 overflow-hidden'
      >
        {/* Esferas difuminadas para dar ese toque moderno (HeroUI/Vercel vibes) */}
        <div className='absolute top-20 right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-lg text-center'>
          <div className='bg-background/60 backdrop-blur-md p-8 rounded-3xl border border-default-200 shadow-xl'>
            <div className='flex justify-center mb-6'>
              <div className='p-4 bg-primary/10 rounded-full text-primary relative'>
                <Sparkles className='w-8 h-8' />
              </div>
            </div>
            <h2 className='text-2xl font-bold mb-4'>Tu biblioteca personal en la nube</h2>
            <p className='text-default-500 leading-relaxed'>
              Guarda tus enlaces favoritos, organízalos mediante etiquetas y accede a ellos desde
              cualquier dispositivo. Tobimarks se encarga de recordarlo todo por ti.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
