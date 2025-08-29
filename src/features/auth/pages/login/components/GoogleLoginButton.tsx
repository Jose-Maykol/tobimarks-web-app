import type { JSX } from 'react'
import { GoogleLogin } from '@react-oauth/google'

const GoogleLoginButton = (): JSX.Element => {
  const handleLoginSuccess = async (credentialResponse: { credential?: string }): Promise<void> => {
    if (!credentialResponse.credential) {
      console.error('No credential received from Google login')
      return
    }
    const idToken: string = credentialResponse.credential

    console.log('ID Token:', idToken)

    const res: Response = await fetch('https://tu-api.com/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    const data: unknown = await res.json()
    console.log('Usuario autenticado:', data)
  }

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.error('Error de inicio de sesión')}
      theme='filled_black'
    />
  )
}

export default GoogleLoginButton
