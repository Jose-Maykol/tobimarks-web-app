import { addToast, Card, CardBody, CardHeader, Switch } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { Bot, Folder, Tags } from 'lucide-react'

import UserService from '../services/userService'
import { useUserStore } from '../stores/useUserStore'

const UserAiSettings = () => {
  const { user, set: setUser } = useUserStore()

  const updateSettingsMutation = useMutation({
    mutationFn: UserService.updateSettings,
    onSuccess: (_, variables) => {
      addToast({ title: 'Preferencias de IA actualizadas', color: 'success' })
      if (user) {
        setUser({
          ...user,
          settings: {
            ...user.settings,
            ...variables,
          },
        })
      }
    },
    onError: () => {
      addToast({ title: 'Error al actualizar preferencias', color: 'danger' })
    },
  })

  return (
    <Card className='border-none bg-content1 shadow-md h-full'>
      <CardHeader className='px-6 pt-6 pb-2 text-primary'>
        <h2 className='text-xl font-semibold flex items-center gap-2'>
          <Bot size={24} />
          Inteligencia Artificial
        </h2>
      </CardHeader>
      <CardBody className='px-6 py-4'>
        <p className='text-sm text-default-500 mb-6'>
          Configura las acciones automáticas que la IA realizará por ti al guardar nuevos
          marcadores.
        </p>

        <div className='flex flex-col gap-4'>
          <div className='flex items-start justify-between gap-4 p-5 rounded-2xl border border-divider bg-background shadow-sm hover:border-primary/50 transition-colors'>
            <div className='flex items-start gap-4'>
              <div className='hidden sm:flex p-3 bg-primary/10 text-primary rounded-xl'>
                <Tags size={24} strokeWidth={2} />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2 text-foreground font-semibold'>
                  <Tags size={18} className='text-primary sm:hidden' />
                  Auto-Etiquetado Inteligente
                </div>
                <p className='text-sm text-neutral-500 max-w-[85%]'>
                  La IA analizará el contenido del sitio web del marcador guardado y le asignará las
                  etiquetas (tags) más relevantes de forma automática.
                </p>
              </div>
            </div>
            <Switch
              isSelected={!!user?.settings?.aiAutoTags}
              isDisabled={updateSettingsMutation.isPending || !user}
              onValueChange={(isSelected) =>
                updateSettingsMutation.mutate({ aiAutoTags: isSelected })
              }
              classNames={{ wrapper: 'group-data-[selected=true]:bg-primary mt-1' }}
            />
          </div>

          <div className='flex items-start justify-between gap-4 p-5 rounded-2xl border border-divider bg-background shadow-sm hover:border-primary/50 transition-colors'>
            <div className='flex items-start gap-4'>
              <div className='hidden sm:flex p-3 bg-primary/10 text-primary rounded-xl'>
                <Folder size={24} strokeWidth={2} />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2 text-foreground font-semibold'>
                  <Folder size={18} className='text-primary sm:hidden' />
                  Organización Automática en Colección
                </div>
                <p className='text-sm text-neutral-500 max-w-[85%]'>
                  Sugiere y auto-asigna la colección correcta cuando guardes un nuevo marcador
                  analizando el ecosistema y la semántica del contenido.
                </p>
              </div>
            </div>
            <Switch
              isSelected={!!user?.settings?.aiAutoCollections}
              isDisabled={updateSettingsMutation.isPending || !user}
              onValueChange={(isSelected) =>
                updateSettingsMutation.mutate({ aiAutoCollections: isSelected })
              }
              classNames={{ wrapper: 'group-data-[selected=true]:bg-primary mt-1' }}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default UserAiSettings
