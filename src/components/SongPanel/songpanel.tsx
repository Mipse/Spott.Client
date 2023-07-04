import './songpanel.sass'
import {ISongItem} from '../../ISongItem'
import {useState} from 'react'
import { injector, Player, PlayState } from '../../scripts/playerContainer'

const SongPanel = ({artist, songName, length, audioUri} : ISongItem) => {
  const [audio] = useState(injector.get(Audio));
  const [currentTime, SetCurrentTime] = useState(0);
  const [playState] = useState<PlayState>(injector.get(PlayState));
  const [player] = useState<Player>(injector.get(Player))

  audio.volume = 0.2
  const playfunc = () => {
    audio.src = audioUri;
    playState.src = audio.src;
    audio.currentTime = currentTime;
      audio.oncanplaythrough = function()
      {
          player.song.artist = artist
          player.song.songName = songName
          player.song.length = length
          audio.play();
      }
      playState.isPlaying = true;
    }
  const pausefunc = () => 
  {
    audio.pause();
    SetCurrentTime(audio.currentTime);
    playState.isPlaying = false;
  }

  return (
    <div id="SongPanel">
        <img src="https://cdn-icons-png.flaticon.com/512/17/17550.png" alt='button' role='button' onClick={() => {if (playState.src === audioUri && playState.isPlaying) pausefunc(); else playfunc()}}/>
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