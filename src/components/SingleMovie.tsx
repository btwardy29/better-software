import styles from './SingleMovie.module.scss'

interface Movie {
  AvailableFrom: Date,
  Description?: string,
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

interface MovieProps {
  movie: Movie,
  index: number,
  setMovieId: (val:number) => void,
  setShowMovie: (val: boolean) => void,
}

const SingleMovie = ({ movie, index, setMovieId, setShowMovie }: MovieProps) => {

  return (
    <div
      className={styles.wrapper}
      style={{ animationDelay: `${index / 5}s` }}
      onClick={() => {
        setShowMovie(true)
        setMovieId(movie.Id)
        }
      }
    >
      {movie.Images.length ?
      <div
        className={styles.imgContainer}
        style={{ backgroundImage: `url(${movie.Images[0].Url})` }}
      />
        :
        <div
        className={styles.imgContainer}
        style={{ backgroundImage: `url(https://portalmedycynaestetyczna.pl/wp-content/plugins/penci-pennews-portfolio/images/no-thumbnail.jpg)` }}
      />
      }
      <div className={styles.description}>
        <h2>{movie.Title}</h2>
        <h4>{movie.Description ? movie.Description : 'There is no description for this movie'}</h4>
        
      </div>
    </div>
  )
}

export default SingleMovie