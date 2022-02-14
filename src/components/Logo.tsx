import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <span className={`material-icons ${styles.icon}`}>movie_filter</span>
      <div>
        <span className={styles.logo1}>
          <span className={styles.letter}>M</span>oo
        </span>
        <span className={styles.logo2}>
          <span className={styles.letter}>V</span>izz
        </span>
      </div>
    </div>
  )
}

export default Logo