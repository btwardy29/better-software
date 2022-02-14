import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthEnum } from '../enums'
import { useAuthContext } from './useAuthContext'
import useSessionStorage from './useSessionStorage'


const useSignIn = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authStorage, setAuthStorage] = useSessionStorage("auth");

  const { dispatch } = useAuthContext()
  let navigate = useNavigate();
  
  const signIn = async (email:string = '', password:string = '') => {
    setIsPending(true)
    setError(null)
    
    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://thebetter.bsgroup.eu/Authorization/SignIn',
        data: {
          // "test@bsgroup.eu"
          Username: `${email}`, 
          // "Test12!@"
          Password: `${password}`,
          Device: {
            Name: "7a6a86e5-356f-4795-8998-305e1b205531",
            PlatformCode: "WEB"
          }
        }
      });
      dispatch({ type: AuthEnum.LOG_IN, payload: data })
      setAuthStorage(data)
      setIsPending(false)
      navigate('/')
    } catch (err) {
      setIsPending(false)
      if (err instanceof Error) {
        setError(err.message)
        return
      }
      setError('Something went wrong.')
    }
  }

  return { isPending, error, signIn }
}

export default useSignIn