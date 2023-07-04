import './songpanel.sass'
import {ISongItem} from '../../entities/ISongItem'
import {useState, FC, useCallback} from 'react'
import { injector } from '../../scripts/playerContainer'
import { PlayState } from "../../entities/PlayState"
import { Player } from "../../entities/Player"

interface SongPanelProps{
  song: ISongItem,
  player: Player,
  onPlayerChange: ((player: Player) => void)
}

const SongPanel : FC<SongPanelProps>= ({song, player, onPlayerChange}) => {
  const [audio] = useState(injector.get(Audio));
  const [currentTime, SetCurrentTime] = useState(0);
  const [playState] = useState<PlayState>(injector.get(PlayState));

  useCallback(()=>console.log(player.song.id), [player])

  audio.volume = 0.2
  const playfunc = () => {
    audio.src = song.audioUri;
    playState.src = audio.src;
    audio.currentTime = currentTime;
      audio.oncanplaythrough = function()
      {
          player.song = song;
          onPlayerChange(player);
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
        <img src="https://cdn-icons-png.flaticon.com/512/17/17550.png" alt='button' role='button' onClick={() => {if (playState.src === song.audioUri && playState.isPlaying) pausefunc(); else playfunc()}}/>
        <span id="InfoLength">
          <span id="Info">
              <h3>{song.artist}</h3>
              <h4>{song.songName}</h4>
          </span>
          <span id='Length'>
            <h1>{song.length}</h1>
          </span>
        </span>
    </div>
  )
}

export default SongPanel