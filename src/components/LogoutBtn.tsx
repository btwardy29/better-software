import { useNavigate } from 'react-router-dom'
import { AuthEnum } from '../enums'
import { useAuthContext } from '../hooks/useAuthContext'
import useSessionStorage from '../hooks/useSessionStorage'
import styles from './LogoutBtn.module.scss'

const LogoutBtn = () => {

  const { dispatch } = useAuthContext()
  const [authStorage, setAuthStorage] = useSessionStorage("auth");
  let navigate = useNavigate();


  const handleLogout = () => {
    dispatch({ type: AuthEnum.LOG_OUT, payload: null })
    setAuthStorage(null)
    navigate('/login')
  }

  return (
    <div className={styles.logout} onClick={handleLogout}>
      <span className="material-icons">
        logout
      </span>
      <p>Logout</p>
    </div>
  )
}

export default LogoutBtn