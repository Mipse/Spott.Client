import {useState, useEffect} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './entities/ISongItem'
import './App.sass'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Header from './components/header/header'
import PlayerSong from './components/player/player'
import { injector } from './scripts/playerContainer'
import {Player} from './entities/Player'
import {PostSongForm} from './components/postSongForm/postSongForm'

const App = () => {
  const [songs, SetSongs] = useState<ISongItem[]>()
  const [isFetced, SetIsFetched] = useState<boolean>(false)
   useEffect(() => {
    const dataFetch = async () =>{
      const data = await (
      await fetch("https://spott.fly.dev/songs", {method: 'GET'})
    ).json()
    SetSongs(data);
    SetIsFetched(true)
  };
  dataFetch();
   },[]);

   useEffect(() =>{
    document.title = "Spott"
   },[])
   
   const [player,setPlayer] = useState<Player>(injector.get(Player))
   
   const playerCallback = (player1: Player) =>{
      setPlayer(player1);
   }

   let func = () => songs?.map(song => {
    return <SongPanel key={song.artist} song={song} player={player} onPlayerChange={playerCallback}/> 
   });
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Spott.Client' element={
          <div>
            <div id="Header">
              <Header/>
            </div>
            <div id='Songs'>
              {isFetced ? func() : <div id="Loader"></div>}
            </div>
            <div id="Player">
              <PlayerSong player={player}/>
            </div>
          </div>
        }>
        </Route>  
        <Route path='/submit' element={
         <PostSongForm/>
        }></Route> 
      </Routes>
    </BrowserRouter>

  )
}

export default App