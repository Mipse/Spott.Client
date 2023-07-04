import {useEffect, useState} from 'react'
import { injector, Player } from '../../scripts/playerContainer'
import './player.sass'

const PlayerSong = () => {
   const [player] = useState<Player>(injector.get(Player));
   useEffect(() => console.log(player.song), [player])
   setTimeout(() => console.log(player.song), 10000);
  return (
    <div id="Player">
        <div>
            {injector.get(Player).song.artist}
            {player.song.songName}
        </div>
    </div>
  )
}

export default PlayerSong