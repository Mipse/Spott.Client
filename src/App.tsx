import {useState, useEffect, useCallback} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './entities/ISongItem'
import './App.sass'
import {Routes, Route} from 'react-router-dom'
import { fetchUri } from './scripts/fetchSongs'
import Header from './components/header/header'
import PlayerSong from './components/player/player'
import { injector } from './scripts/playerContainer'
import {Player} from './entities/Player'
import React from 'react'
import { getToken } from './scripts/getToken'

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

   useCallback(()=>console.log(player.song.id),[player.song])
   let func = () => songsWithUri?.map(song => {
    return <SongPanel key={song.artist} song={song} player={player} onPlayerChange={playerCallback}/> 
   });
  return (
    <><Routes>
      <Route path='/' element={
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
      }>
      </Route> 
      <Route path='/token' element={
          <input type="button" onClick={() => {getToken()}}>
        </input>
      }></Route>     
    </Routes>

    </>
  )
}

export default App