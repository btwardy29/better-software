import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react'


const useAxios = () => {
  const [error, setError] = useState<{Message : string}>();
  const [isPending, setIsPending] = useState(false);

  const fetchData = async ({ url, method, data = {}, headers = {} }: AxiosRequestConfig) => {

    try {
      setIsPending(true)
      setError(undefined)
      
      const query = await axios({
        method,
        url,
        headers,
        data
      })
      setIsPending(false)
      return query
    } catch (err) {
      setIsPending(false)
      if (axios.isAxiosError(err)) {
        setError(err.response?.data)
      }
    }
  }

  return { error, isPending, fetchData }
}

export default useAxios


 