import {useEffect} from 'react'
import { Player } from "../../entities/Player";
import './player.sass'

interface PlayerSongProps{
    player : Player
}

const PlayerSong: React.FC<PlayerSongProps> = ({player}) => {
   useEffect(() => {
    const interval = setInterval(() =>{
        RenderPlayer(player)
    }, 2000);
    return () => clearInterval(interval)
   })

    useEffect(() => console.log(player.song.id),[player])

   const RenderPlayer = (player: Player) => {
        return(
            <div>
                {player.song.artist}
            </div>
        )
   }
  return (
    <div id="Player">
        <div>
            {player.song.id}
        </div>
    </div>
  )
}

export default PlayerSong