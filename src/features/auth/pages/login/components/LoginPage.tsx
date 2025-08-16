import type { JSX } from 'react'
import { GoogleLogin } from '@react-oauth/google'

const LoginPage = (): JSX.Element => {
  const handleLoginSuccess = async (credentialResponse: { credential: string }): Promise<void> => {
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
    <div>
      <h1>Login</h1>
      <div>
        <GoogleLogin
          onSuccess={handleLoginSuccess as (res: unknown) => void}
          onError={() => console.error('Error de inicio de sesión')}
        />
      </div>
    </div>
  )
}

export default LoginPage
