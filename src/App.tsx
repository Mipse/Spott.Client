import {useState, useEffect} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './ISongItem'
import './App.sass'


const App = () => {
  const[songs, setSongs] = useState<ISongItem[]>()
   useEffect(() => {
    const dataFetch = async () =>{
      const data = await (
      await fetch("http://localhost:5011/songs", {method: 'GET'})
    ).json()
    setSongs(data);
    console.log(data)
  };
  dataFetch();
   },[]);
   let func = () => songs?.map(song => {
    return <SongPanel key={song.artist} artist={song.artist} songName={song.songName} length={song.length}/> 
   });
  return (
    <div id='Songs'>
      {func()}
    </div>
  )
}

export default App