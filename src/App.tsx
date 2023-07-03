import {useState, useEffect} from 'react'
import SongPanel from './components/SongPanel/songpanel'
import {ISongItem} from './ISongItem'
import './App.sass'


const App = () => {
  const [isFetched, SetIsFetched] = useState(false);
  const fetchUri = async (artist: string, songName: string) : Promise<string> =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '94966d2417msh9ab231a24f37fccp146266jsn17eadde243c3',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
    let audioUri : string = ""
     await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist + songName, options)
                    .then(responce => responce.json())
                    .then(data => {try{audioUri = data.data[0].preview; console.log(data.data[0].preview)} catch(error){console.log(artist+songName)}})
    return Promise.resolve(audioUri);
  }
  const[songs, setSongs] = useState<ISongItem[]>()
   useEffect(() => {
    const dataFetch = async () =>{
      const data = await (
      await fetch("http://localhost:5011/songs", {method: 'GET'})
    ).json()
    setSongs(data);
  };
  dataFetch();
   },[]);

   songs?.forEach(song => fetchUri(song.artist, song.songName).then(audioUri => song.audioUri = audioUri));
   setTimeout(() => SetIsFetched(true), 1000);
   let func = () => songs?.map(song => {
    return <SongPanel key={song.artist} artist={song.artist} songName={song.songName} length={song.length} audioUri={song.audioUri}/> 
   });
  return (
    <div id='Songs'>
      {isFetched ? func(): 'Loading'}
    </div>
  )
}

export default App