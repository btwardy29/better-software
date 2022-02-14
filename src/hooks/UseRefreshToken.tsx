import axios from 'axios'
import { useState } from 'react'
import { AuthEnum } from '../enums'
import { useAuthContext } from './useAuthContext'
import useSessionStorage from './useSessionStorage'


const useRefreshToken = () => {
  const [error, setError] = useState<string | null>(null)
  const [authStorage, setAuthStorage] = useSessionStorage("auth");
  
  const { dispatch } = useAuthContext()
  
  const refreshToken = async () => {
    setError(null)
    const token = authStorage.AuthorizationToken.RefreshToken
    
    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://thebetter.bsgroup.eu/Authorization/RefreshToken',
        data: {
          Token: token,
          Device: {
            Name: "012726A2-6E6B-1439-70C0-E06CB7727865",
            PlatformCode: "WEB"
          }
        }
      });
      setAuthStorage(data)
      dispatch({ type: AuthEnum.REFRESH_TOKEN, payload: data })
      console.log('Token has been refreshed.')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        return
      }
      setError('Something went wrong.')
    } 
  }

  return { error, refreshToken }
}

export default useRefreshToken