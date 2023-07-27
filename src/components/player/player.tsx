import {useEffect, useState} from 'react'
import { Player } from "../../entities/Player";
import { PlayState } from '../../entities/PlayState';
import { injector } from '../../scripts/playerContainer';
import './player.sass'

interface PlayerSongProps{
    player : Player
}

type PlayerBar ={
    songname: string,
    artist: string,
    isPlaying: boolean
}

const PlayerSong: React.FC<PlayerSongProps> = ({player}) => {


    const [playerBar, setPlayerBar] = useState<PlayerBar>({songname: player.song.songName, artist: player.song.artist, isPlaying: injector.get(PlayState).isPlaying})

    useEffect(() => {
        const interval = setInterval(() =>{
            setPlayerBar({songname: player.song.songName, artist: player.song.artist, isPlaying: injector.get(PlayState).isPlaying});
        }, 1000);
        return () => clearInterval(interval)
       })
  return ( playerBar.isPlaying ? 
    <div id="Player">
        <div>
            <img id="Album" src={player.song.imageUri} alt='album preview'/>
            <div id="ArtistAndSong">
                <h1 id="Artist">{playerBar.artist}</h1>
                <h1 id="SongName">{playerBar.songname}</h1>
            </div>
        </div>
    </div> : <></>
  )
}

export default PlayerSong