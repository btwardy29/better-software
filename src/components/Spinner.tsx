import styles from './Spinner.module.scss'

const Spinner = ({ size, theme }: { size: string, theme: string }) => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={`
      ${styles.spinner}
      ${size === 'large' ? styles.large : styles.small}
      ${theme === 'light' ? styles.light : styles.dark}
      `}></div>
    </div>
  )
};

export default Spinner;
