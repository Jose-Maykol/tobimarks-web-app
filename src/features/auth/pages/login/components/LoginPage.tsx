import type { JSX } from 'react'
import { Bookmark, Cloud, Folder, Search, Tag } from 'lucide-react'

import GoogleLoginButton from './GoogleLoginButton'

const LoginPage = (): JSX.Element => {
  return (
    <div className='flex min-h-screen bg-[#0b0c10] relative overflow-hidden text-white font-sans selection:bg-cyan-500/30'>
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 z-10 transition-all duration-1000 ease-out opacity-0 translate-x-[-20px] animate-in fade-in slide-in-from-left-10 fill-mode-forwards'>
        <div className='w-full max-w-[380px] space-y-12'>
          <div className='space-y-4'>
            <h1 className='text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1]'>
              Bienvenido de nuevo a <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400'>
                Tobimarks
              </span>
            </h1>
            <p className='text-[#8b949e] text-lg font-medium tracking-wide'>
              Tu centro de mando para guardar, organizar y encontrar cualquier enlace al instante.
            </p>
          </div>

          <div className='pt-8 space-y-10'>
            <div className='w-full drop-shadow-md'>
              <GoogleLoginButton />
            </div>

            <div className='relative flex items-center justify-center'>
              <div className='absolute w-full h-px bg-white/[0.04]'></div>
              <div className='relative bg-[#101217] px-5 py-1.5 rounded-full flex items-center gap-0 border border-[#1d2027]/50'>
                <span className='text-[10px] font-bold tracking-[0.15em] text-[#5b6471] uppercase'>
                  Acceso Seguro
                </span>
              </div>
            </div>

            <p className='text-sm text-[#5b6471] text-center font-medium px-2'>
              Al continuar, aceptas los{' '}
              <a
                href='#'
                className='text-blue-500 hover:text-blue-400 transition-colors font-semibold underline-offset-4 decoration-blue-500/30'
              >
                Términos
              </a>{' '}
              y la{' '}
              <a
                href='#'
                className='text-blue-500 hover:text-blue-400 transition-colors font-semibold underline-offset-4 decoration-blue-500/30'
              >
                Política de Privacidad
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex w-1/2 relative items-center justify-center p-14 overflow-hidden bg-gradient-to-br from-[#0b0c10] to-[#0f1219] transition-opacity duration-1000 delay-300 opacity-0 animate-in fade-in fill-mode-forwards'>
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none' />
        <div className='absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.04] rounded-full blur-[120px] pointer-events-none' />

        <div className='relative z-10 w-full max-w-[600px] grid grid-cols-2 grid-rows-3 gap-5 h-[620px]'>
          <div className='col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[32px] p-8 flex flex-col justify-center overflow-hidden relative group shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]'>
            <div className='absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-700' />
            <div className='flex items-center gap-4 mb-3'>
              <div className='p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-2xl shadow-inner'>
                <Bookmark className='w-6 h-6' />
              </div>
              <h2 className='text-2xl font-bold tracking-tight text-white/90'>Tobimarks</h2>
            </div>
            <p className='text-[#8b949e] text-lg max-w-sm leading-relaxed'>
              El gestor inteligente que convierte el caos de tus enlaces en una biblioteca
              centralizada.
            </p>
          </div>

          <div className='col-span-1 row-span-1 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] backdrop-blur-xl rounded-[32px] p-7 flex flex-col items-center justify-center text-center group shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]'>
            <div className='p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500 ease-out'>
              <Cloud className='w-8 h-8' />
            </div>
            <h3 className='font-semibold text-lg mb-2 text-white/90'>Sincronización</h3>
            <p className='text-sm text-[#8b949e]'>
              Accede desde cualquier dispositivo, al instante.
            </p>
          </div>

          <div className='col-span-1 row-span-1 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[32px] p-7 flex flex-col justify-center group shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]'>
            <div className='absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-700' />
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2.5 bg-purple-500/10 text-purple-400 rounded-xl'>
                <Search className='w-5 h-5' />
              </div>
              <h3 className='font-semibold text-white/90'>Búsqueda Global</h3>
            </div>
            <div className='h-11 bg-black/40 rounded-xl border border-white/5 flex items-center px-4 overflow-hidden shadow-inner'>
              <span className='text-sm text-[#8b949e] type-writer'>diseño ui ux|</span>
            </div>
          </div>

          <div className='col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[32px] p-8 flex items-center justify-between shadow-xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]'>
            <div className='flex-1 pr-6 z-10'>
              <h3 className='text-xl font-bold mb-2 text-white/90'>Organización Total</h3>
              <p className='text-[#8b949e] text-sm leading-relaxed'>
                Categoriza con etiquetas dinámicas y agrupa en colecciones inteligentes.
              </p>
            </div>
            <div className='flex gap-4 z-10'>
              <div className='flex flex-col gap-3 justify-center'>
                <div className='px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg'>
                  <Tag className='w-3.5 h-3.5' /> Design
                </div>
                <div className='px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg'>
                  <Tag className='w-3.5 h-3.5' /> Inspiration
                </div>
              </div>
              <div className='w-28 h-28 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center justify-center flex-col gap-3 text-blue-400 shadow-inner hover:bg-blue-500/10 transition-colors duration-500'>
                <Folder className='w-8 h-8' />
                <span className='text-xs font-semibold tracking-wide'>Proyectos</span>
              </div>
            </div>
            <div className='absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none' />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing {
          0%, 20% { width: 0; }
          40%, 80% { width: 100px; }
          100% { width: 0; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .type-writer {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #3b82f6;
          animation: typing 5s steps(30, end) infinite, blink .75s step-end infinite;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
