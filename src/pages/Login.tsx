import { useEffect, useState } from 'react'
import useSignIn from '../hooks/useSignIn'

import Logo from '../components/Logo'

import styles from './Login.module.scss'
import '../styles/global.scss'
import useSessionStorage from '../hooks/useSessionStorage'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Login = () => {
  const [email, setEmail] = useState('test@bsgroup.eu')
  const [password, setPassword] = useState('Test12!@')

  let navigate = useNavigate();
  const storedValue = useSessionStorage("auth", null);
  const { signIn, error, isPending } = useSignIn()
  
  useEffect(() => {
    if (storedValue[0]) {
      navigate('/')
    }
  }, [storedValue])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn(email, password)
  }
  const handleAnonymousSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    await signIn()
  }
  
  return (
    <div className={styles.wrapper}>
      <Logo />
      <p className={styles.loginMessage}>Login</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <span className="material-icons">account_circle</span>
          <input className='loginInput' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputWrapper}>
          <span className="material-icons">vpn_key</span>
          <input className='loginInput' placeholder='Your password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit' className='btn'>{ isPending ? <Spinner theme='light' size='small'/> : 'Login'}</button>
      </form>
      <p className={styles.anonymous} onClick={handleAnonymousSubmit}>...or continue anonymously</p>

      <p className='error'>{error && error}</p>
    </div>
  )
}

export default Login