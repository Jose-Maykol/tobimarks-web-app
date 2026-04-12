import type { JSX } from 'react'
import {
  Folder,
  Globe,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
} from 'lucide-react'

const LoginShowcase = (): JSX.Element => {
  return (
    <div className='hidden lg:flex w-1/2 relative items-center justify-center p-14 overflow-hidden bg-gradient-to-br from-[#0b0c10] to-[#0f1219] transition-opacity duration-1000 delay-300 animate-in fade-in fill-mode-forwards'>
      <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.04] rounded-full blur-[120px] pointer-events-none' />

      <div className='relative z-10 w-full max-w-[640px] flex flex-col gap-8 h-auto'>
        <div className='text-center space-y-4 mb-2'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/[0.05] text-primary/80 text-sm font-semibold shadow-xl'>
            <Sparkles className='w-4 h-4' />
            Tu biblioteca web personal
          </div>
          <h2 className='text-[34px] font-bold bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-tight'>
            Convierte el caos de tus enlaces <br /> en un entorno organizado
          </h2>
        </div>

        <div className='relative w-full aspect-[4/3] min-h-[460px] perspective-1000'>
          <div className='absolute inset-0 bg-[#12141c]/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden rotate-y-[-2deg] rotate-x-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out'>
            <div className='w-full h-14 border-b border-white/[0.05] flex items-center px-5 gap-6'>
              <div className='flex gap-1.5 opacity-60'>
                <div className='w-3 h-3 rounded-full bg-[#ff5f56]' />
                <div className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
                <div className='w-3 h-3 rounded-full bg-[#27c93f]' />
              </div>
              <div className='flex-1 max-w-sm h-8 bg-white/5 rounded-lg border border-white/[0.05] flex items-center px-3 text-[#5b6471] text-xs gap-2 shadow-inner'>
                <Search className='w-3.5 h-3.5' />
                <span className='type-writer ml-1'>github.com/microsoft/...</span>
              </div>
            </div>

            <div className='flex-1 flex'>
              <div className='w-56 border-r border-white/[0.05] p-5 flex flex-col gap-6 bg-white/[0.01]'>
                <div className='flex flex-col gap-2'>
                  <div className='text-[11px] uppercase font-bold text-white/30 tracking-wider mb-2'>
                    Tus Colecciones
                  </div>
                  <div className='flex items-center gap-3 text-white/80 text-sm py-2 px-3 bg-white/5 rounded-xl border border-white/5 shadow-sm'>
                    <div className='p-1 bg-blue-500/10 rounded-md text-blue-400'>
                      <Folder className='w-4 h-4' />
                    </div>
                    Desarrollo Web
                  </div>
                  <div className='flex items-center gap-3 text-white/50 text-sm py-2 px-3 hover:text-white/80 transition-colors cursor-pointer'>
                    <div className='p-1 bg-purple-500/10 rounded-md text-purple-400'>
                      <Folder className='w-4 h-4' />
                    </div>
                    Inspiración UI
                  </div>
                  <div className='flex items-center gap-3 text-white/50 text-sm py-2 px-3 hover:text-white/80 transition-colors cursor-pointer'>
                    <div className='p-1 bg-green-500/10 rounded-md text-green-400'>
                      <Folder className='w-4 h-4' />
                    </div>
                    Recursos Libres
                  </div>
                </div>

                <div className='flex flex-col gap-2 pt-2'>
                  <div className='text-[11px] uppercase font-bold text-white/30 tracking-wider mb-2'>
                    Etiquetas Populares
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    <span className='px-2.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-lg flex items-center gap-1.5'>
                      <Tag className='w-3 h-3' /> react
                    </span>
                    <span className='px-2.5 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs rounded-lg flex items-center gap-1.5'>
                      <Tag className='w-3 h-3' /> css
                    </span>
                    <span className='px-2.5 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs rounded-lg flex items-center gap-1.5'>
                      <Tag className='w-3 h-3' /> tutorial
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex-1 p-6 relative overflow-hidden bg-gradient-to-br from-transparent to-white/[0.01]'>
                <div className='flex justify-between items-center mb-6'>
                  <h3 className='font-bold text-white/90 text-xl tracking-tight'>Desarrollo Web</h3>
                  <div className='p-2 bg-white/5 rounded-lg border border-white/5 text-white/60'>
                    <LayoutGrid className='w-4 h-4' />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 relative z-10'>
                  <div className='bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-4 flex gap-4 hover:translate-x-2 transition-transform duration-300 group shadow-lg backdrop-blur-sm'>
                    <div className='w-12 h-12 bg-gradient-to-br from-[#24292e] to-[#1b1f23] rounded-xl flex items-center justify-center border border-white/10 shrink-0 shadow-inner group-hover:shadow-[#24292e]/50 transition-shadow'>
                      <Globe className='w-6 h-6 text-gray-300' />
                    </div>
                    <div className='flex-1 min-w-0 flex flex-col justify-center'>
                      <h4 className='text-sm font-semibold text-white/90 truncate group-hover:text-primary transition-colors'>
                        Documentación de React
                      </h4>
                      <p className='text-xs text-white/40 truncate mt-0.5'>https://react.dev</p>
                    </div>
                  </div>

                  <div className='bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-4 flex gap-4 hover:translate-x-2 transition-transform duration-300 delay-75 group shadow-lg backdrop-blur-sm'>
                    <div className='w-12 h-12 flex items-center justify-center shrink-0'>
                      <div className='w-full h-full bg-white rounded-xl flex items-center justify-center'>
                        <span className='text-black font-extrabold text-xl'>N</span>
                      </div>
                    </div>
                    <div className='flex-1 min-w-0 flex flex-col justify-center'>
                      <h4 className='text-sm font-semibold text-white/90 truncate group-hover:text-primary transition-colors'>
                        Next.js Framework
                      </h4>
                      <p className='text-xs text-white/40 truncate mt-0.5'>https://nextjs.org</p>
                    </div>
                  </div>
                </div>

                <div className='absolute bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform'>
                  <Plus className='w-6 h-6' />
                </div>
                <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#12141c] to-transparent pointer-events-none' />
              </div>
            </div>
          </div>

          <div className='absolute -bottom-6 -left-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl animate-bounce-slow'>
            <div className='p-2.5 bg-green-500/10 text-green-400 rounded-xl'>
              <ShieldCheck className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm font-bold text-white/90'>Sincronización Segura</p>
              <p className='text-xs text-white/50'>Tus datos encriptados</p>
            </div>
          </div>

          <div className='absolute -top-6 -right-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl animate-bounce-slow-delayed'>
            <div className='p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl'>
              <MessageSquare className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm font-bold text-white/90'>Búsqueda IA</p>
              <p className='text-xs text-white/50'>Encuentra al instante</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing {
          0%, 30% { width: 0; }
          60%, 100% { width: 140px; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .type-writer {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #5b6471;
          animation: typing 6s steps(30, end) infinite, blink .75s step-end infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        .animate-bounce-slow-delayed {
          animation: bounce-slow 7s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  )
}

export default LoginShowcase
