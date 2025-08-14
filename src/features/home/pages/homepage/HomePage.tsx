import { GoogleLogin } from '@react-oauth/google'

const HomePage = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential

    console.log('ID Token:', idToken)

    // Enviar idToken directamente a tu backend
    const res = await fetch('https://tu-api.com/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    const data = await res.json()
    console.log('Usuario autenticado:', data)
  }

  return (
    <section>
      <div className=''>TOBIMARKS 🚀</div>
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login failed')} />
    </section>
  )
}

export default HomePage
