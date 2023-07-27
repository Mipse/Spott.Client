import {useState, useEffect, useCallback} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './entities/ISongItem'
import './App.sass'
import {Routes, Route} from 'react-router-dom'
import Header from './components/header/header'
import PlayerSong from './components/player/player'
import { injector } from './scripts/playerContainer'
import {Player} from './entities/Player'

const App = () => {
  const[songs, setSongs] = useState<ISongItem[]>()
   useEffect(() => {
    const dataFetch = async () =>{
      const data = await (
      await fetch("https://spott.fly.dev/songs", {method: 'GET'})
    ).json()
    setSongs(data);
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
    <><Routes>
      <Route path='/Spott.Client' element={
              <div>
              <div id="Header">
                <Header/>
              </div>
              <div id='Songs'>
                {func()}
              </div>
              <div id="Player">
                <PlayerSong player={player}/>
              </div>
            </div>
      }>
      </Route>   
    </Routes>

    </>
  )
}

export default App