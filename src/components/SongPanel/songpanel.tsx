import './songpanel.sass'
import {ISongItem} from '../../entities/ISongItem'
import {useState, FC, useEffect} from 'react'
import { injector } from '../../scripts/playerContainer'
import { PlayState } from "../../entities/PlayState"
import { Player } from "../../entities/Player"
import pauseIcon from '../../assets/pauseIcon.png'
import onplayIcon from '../../assets/playIcon.jpg'

interface SongPanelProps{
  song: ISongItem,
  player: Player,
  onPlayerChange: ((player: Player) => void)
}

const SongPanel : FC<SongPanelProps>= ({song, player, onPlayerChange}) => {
  const [audio] = useState(injector.get(Audio));
  const [currentTime, SetCurrentTime] = useState(0);
  const [playState] = useState<PlayState>(injector.get(PlayState));
  const [playIcon, SetPlayIcon] = useState<any>("https://icon-library.com/images/play-icon-white-png/play-icon-white-png-8.jpg");

  useEffect(() => {
    const interval = setInterval(() =>{
      if (playState.isPlaying && playState.src === song.playUri && !audio.paused) 
      SetPlayIcon(pauseIcon);
      else SetPlayIcon(onplayIcon)
    }, 200);
    return () => clearInterval(interval)
   })


  audio.volume = 0.2
  const playfunc = () => {
    audio.src = song.playUri;
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
        <img id='Preview' src={song.imageUri} alt='Preview'/>
        <img src={playIcon} id='playIcon' alt='button' role='button' onClick={() => {if (playState.src === song.playUri && playState.isPlaying) pausefunc(); else playfunc()}}/>
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