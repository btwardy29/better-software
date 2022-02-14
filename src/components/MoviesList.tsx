import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import SingleMovie from './SingleMovie'

import styles from './MoviesList.module.scss'
import Spinner from './Spinner'
import Modal from './Modal'
import useAxios from '../hooks/useAxios'

interface Movie {
  AvailableFrom: Date,
  Guid: string,
  Id: number,
  Images: {
    Height: number,
    Id: number,
    ImageTypeCode: string,
    MediaId: number,
    PlatformCode: string,
    Url: string,
    Width: number,
  }[]
  IsTrialContentAvailable: boolean,
  MediaAgeRestrictionImageUrl: string,
  MediaAgeRestrictionValueMin: number,
  MediaTypeCode: string,
  MediaTypeDisplayName: string,
  Products: { id: number }[]
  Title: string
}

const MoviesList = ({ category }: { category: string }) => {
  const [moviesList, setMoviesList] = useState<Movie[]>([])
  const [showMovie, setShowMovie] = useState<boolean>(false)
  const [movieId, setMovieId] = useState<number | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const { auth } = useAuthContext()
  const token = auth?.AuthorizationToken.Token


  const URL = 'https://thebetter.bsgroup.eu/Media/GetMediaList'
  const METHOD = 'POST'
  const HEADERS = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  const DATA = {
    MediaListId: +category,
    IncludeCategories: false,
    IncludeImages: true,
    IncludeMedia: false,
    PageNumber: 1,
    PageSize: 15
  }
  const { fetchData, isPending } = useAxios()

  useEffect(() => { 
    setIsFetching(true)
    if (isFetching) {
      const fetching = async () => {
        const data = await fetchData({ url:URL, method:METHOD, data:DATA, headers:HEADERS })
        setMoviesList(data?.data.Entities)
      }
      fetching()
    }
    return () => setIsFetching(false)
  }, [isFetching])
  
  return (
    <>
    <div className={styles.wrapper}>
      {isPending && <div className={styles.spinnerWrapper}><Spinner theme='dark' size='large' /></div>}
      {moviesList && moviesList.map((movie: Movie, index: number) => {
        return <SingleMovie movie={movie} index={index} key={movie.Id} setShowMovie={setShowMovie} setMovieId={setMovieId}/>
      })}</div>

      { showMovie && <Modal setShowMovie={setShowMovie} movieId={movieId} />}
    </>
  )
}

export default MoviesList