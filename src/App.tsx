import {useState, useEffect} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './ISongItem'
import './App.sass'
import { fetchUri } from './scripts/fetchSongs'
import Header from './components/header/header'


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

   let func = () => songsWithUri?.map(song => {
    return <SongPanel key={song.artist} artist={song.artist} songName={song.songName} length={song.length} audioUri={song.audioUri}/> 
   });
  return (
    <div>
      <Header/>
      <div id='Songs'>
        {isFetched ? func(): 'Loading'}
      </div>
    </div>
  )
}

export default App