import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

import styles from './MoviePlayer.module.scss'

interface MoviePlayerProps {
  videoData: {
    ContentUrl?: string,
    Description: string,
    MediaId: number,
    MediaTypeCode: string,
    MediaTypeDisplayName: string,
    Provider: string,
    StreamId: number,
    Title: string
  }
}

const MoviePlayer:React.FC<MoviePlayerProps> = ({ videoData }) => {
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mouseIdle, setMouseIdle] = useState(false)

  const handleProgress = (e: { playedSeconds: number }) => {
    setProgress(e.playedSeconds)
  }
  const handleDuration = (e: number) => {
    setDuration(e)
  } 

  const handleFullScreen = () => {
    const screener = document.getElementById('screener')
    if (screenfull.isEnabled && screener) {
      screenfull.request(screener);
    }
  }
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>
    let idleState = false;

    function showPlayBtn(time:number) {
      clearTimeout(idleTimer);
      if (idleState === true) {
        setMouseIdle(false)
      }
      idleState = false;
      idleTimer = setTimeout(function() {
        setMouseIdle(true)
        idleState = true;
      }, time);
    }
    
    showPlayBtn(2000);
    window.addEventListener('mousemove', function () {
      showPlayBtn(2000)
    })
  }, [mouseIdle])

  return (
    <div id='screener'>
      <ReactPlayer
        url={videoData.ContentUrl}
        width='100%'
        height='100%'
        playing={isPlaying}
        onProgress={handleProgress}
        onDuration={handleDuration}
        
      />
      <div className={styles.buttonsWrapper} onDoubleClick={handleFullScreen} style={{ opacity: `${mouseIdle ? 0 : 1}` }}>
      {!isPlaying ?
        <span className={`${styles.playBtn} material-icons`} onClick={() => setIsPlaying(true)}>play_circle</span>
        :
        <span className={`${styles.pauseBtn} material-icons`} onClick={() => setIsPlaying(false)}>pause_circle</span>
      }
        </div>
      <div className={styles.progressBar} style={{ width: `${progress / duration * 100}%` }} />
    </div>
  )
}

export default MoviePlayer

