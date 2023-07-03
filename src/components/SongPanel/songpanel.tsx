import './songpanel.sass'
import {ISongItem} from '../../ISongItem'
import {useState} from 'react'

const SongPanel = ({artist, songName, length, audioUri} : ISongItem) => {
  const [isPlaying, SetIsPlaying] = useState(false);
  const [audio, SetAudio] = useState(new Audio(audioUri));
  const [currentTime, SetCurrentTime] = useState(0);
  audio.volume = 0.2
  const playfunc = () => {
    audio.currentTime = currentTime;
      audio.oncanplaythrough = function()
      {
          audio.play();
      }
      SetIsPlaying(true);
    }
  const pausefunc = () => 
  {
    audio.pause();
    SetCurrentTime(audio.currentTime);
    SetIsPlaying(false);
  }
  return (
    <div id="SongPanel">
        <img src="https://cdn-icons-png.flaticon.com/512/17/17550.png" alt='button' role='button' onClick={isPlaying ? () => pausefunc() : () => playfunc()}/>
        <span id="InfoLength">
          <span id="Info">
              <h3>{artist}</h3>
              <h4>{songName}</h4>
          </span>
          <span id='Length'>
            <h1>{length}</h1>
          </span>
        </span>
    </div>
  )
}

export default SongPanel