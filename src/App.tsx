import {useState, useEffect} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './entities/ISongItem'
import './App.sass'
import { fetchUri } from './scripts/fetchSongs'
import Header from './components/header/header'
import PlayerSong from './components/player/player'
import { injector } from './scripts/playerContainer'
import {Player} from './entities/Player'


const App = () => {
  const [isFetched, SetIsFetched] = useState(false);
  const[songs, setSongs] = useState<ISongItem[]>()
  const[songsWithUri, setSongsWithUri] = useState<ISongItem[]>()

   useEffect(() => {
    const dataFetch = async () =>{
      const data = await (
      await fetch("http://localhost:5011/songs", {method: 'GET'})
    ).json()
    setSongs(data);
  };
  dataFetch();
   },[]);
 
   useEffect(() => {
    fetchUri(songs!).then(songs => setSongsWithUri(songs));
    SetIsFetched(true);
   }, [songs]);
   const [player,setPlayer] = useState<Player>(injector.get(Player))
   const playerCallback = (player1: Player) =>{
      setPlayer(player1);
   }
   useEffect(()=>console.log(player.song.id),[player.song.id])
   let func = () => songsWithUri?.map(song => {
    return <SongPanel key={song.artist} song={song} player={player} onPlayerChange={playerCallback}/> 
   });
  return (
    <div>
      <div id="Header">
        <Header/>
      </div>
      <div id='Songs'>
        {isFetched ? func(): 'Loading'}
      </div>
      <div id="Player">
        <PlayerSong player={player}/>
      </div>
    </div>
  )
}

export default App