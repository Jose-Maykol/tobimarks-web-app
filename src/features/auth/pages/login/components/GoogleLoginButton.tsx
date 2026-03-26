import type { JSX } from 'react'
import { useNavigate } from 'react-router'
import { GoogleLogin } from '@react-oauth/google'

import useAuthStore from '../../../store/useAuthStore'

const GoogleLoginButton = (): JSX.Element => {
  const { signInWithGoogle } = useAuthStore()
  const navigate = useNavigate()

  const handleLoginSuccess = async (credentialResponse: { credential?: string }): Promise<void> => {
    if (!credentialResponse.credential) {
      console.error('No credential received from Google login')
      return
    }
    const idToken: string = credentialResponse.credential

    await signInWithGoogle(idToken)
    navigate('/')
  }

  return (
    <div className='w-[320px] mx-auto flex justify-center overflow-hidden rounded-full h-[40px] [color-scheme:dark] [&>div]:!bg-transparent [&>div]:w-full'>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.error('Error de inicio de sesión')}
        theme='filled_black'
        size='large'
        shape='pill'
        width='320'
        text='continue_with'
      />
    </div>
  )
}

export default GoogleLoginButton
