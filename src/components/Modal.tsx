import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import useAxios from '../hooks/useAxios';
import useOutsideClick from '../hooks/useOutsideClick';
import styles from './Modal.module.scss'
import Spinner from './Spinner';
import MoviePlayer from './MoviePlayer';

interface ModalProps {
  setShowMovie: (val: boolean) => void,
  movieId: number | null
}

const Modal = ({ setShowMovie, movieId }: ModalProps) => {
  const [closeModal, setCloseModal] = useState(false)
  const [videoData, setVideoData] = useState(null)
  const [unmounted, setUnmounted] = useState(false)

  const ref = useRef<HTMLDivElement>(null);
  const { auth } = useAuthContext()
  const { error, isPending, fetchData } = useAxios()
  const token = auth?.AuthorizationToken.Token

  const url = 'https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo'
  const method = 'POST'
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
  const data = {
    MediaId: movieId,
    StreamType: `${auth?.User.Id === -999 ? 'TRIAL' : 'MAIN'}`
  }  

  useEffect(() => {
    const fetchD = async () => {
      if (!unmounted) {
        const resp = await fetchData({ url, method, data, headers })
        if (resp) {
          setVideoData(resp.data)
        }
      }
    }
    fetchD()
 
    return () => setUnmounted(true)
  }, [movieId])

  useOutsideClick(ref, () => {
    setCloseModal(true)
    setTimeout(() => {
      setShowMovie(false)
    }, 500)
  });

  return (
    <div className={`${styles.fullScreen} ${closeModal && styles.fadeOut}`} >
      <h1>{videoData ? videoData['Title'] : '‎'}</h1>
      <div className={styles.movieContainer} ref={ref}>
        {isPending && <Spinner theme='light' size='large' />}
        {videoData && videoData['ContentUrl'] && <MoviePlayer videoData={videoData} />}
        {videoData && !videoData['ContentUrl'] && <p>Sorry, there's no file for this video.</p>}
        {error && <p>{error.Message}</p>}
      </div>
    </div>
  )
}

export default Modal
