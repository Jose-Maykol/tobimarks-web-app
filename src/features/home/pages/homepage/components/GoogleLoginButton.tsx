import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'

type GoogleLoginButtonProps = {
  onLoginSuccess: (credentialResponse: CredentialResponse) => Promise<void>
  onLoginError?: () => void
}

const GoogleLoginButton = ({ onLoginSuccess, onLoginError }: GoogleLoginButtonProps) => (
  <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError ?? (() => {})} />
)

export default GoogleLoginButton
