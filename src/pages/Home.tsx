import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';

import styles from './Home.module.scss'
import { AuthEnum } from '../enums';
import MoviesList from '../components/MoviesList';
import useRefreshToken from '../hooks/UseRefreshToken';
import LogoutBtn from '../components/LogoutBtn';

const Home = () => {
  const [category, setCategory] = useState<string | null>(null)
  const [fade, setFade] = useState(false)

  let navigate = useNavigate();
  const storedValue = useSessionStorage("auth");
  const { dispatch, auth } = useAuthContext()
  const { refreshToken } = useRefreshToken()

  useEffect(() => {
    if (!storedValue[0]) {
      navigate('/login')
      console.log('Missing auth', storedValue)
    }
  }, [storedValue])

  useEffect(() => {
    dispatch({ type: AuthEnum.LOG_IN, payload: storedValue[0] })
    
    if (auth?.User.Id !== -999) {
      const handleRefresh = async () => {
        await refreshToken()
      }
      // Refresh token every 5 minutes
      const refreshInterval = setInterval(handleRefresh, 300000)
  
      return () => clearInterval(refreshInterval)
    }
  }, [storedValue[0]])

  const handleCategoryChange: (category: string) => void = (category) => {
      setFade(true)
      setTimeout(() => setCategory(category), 1000)
  }

  return (
    <>
      <LogoutBtn />
      {!category &&
        <div className={styles.wrapper}>
          <h1 className={`${fade ? 'fadeUp' : ''}`}>Welcome, {auth?.User.FullName}</h1>
          <h1 className={`${fade ? 'fadeUp' : '' }`}>What would like to watch today?</h1>
          <div className={styles.categoriesWrapper}>
            <span className={`${styles.comedy} ${fade ? 'fadeLeft' : '' }` } onClick={() => handleCategoryChange('3')}>Comedy</span>
            <div className={`${styles.separator} ${fade ? 'fadeDown' : '' }` } />
            <span className={`${styles.horror} ${fade ? 'fadeRight' : '' }` } onClick={() => handleCategoryChange('4')}>Horror</span>
          </div>
        </div>
      }
      {category && 
        <MoviesList category={category} />
      }
    </>
  )
}

export default Home