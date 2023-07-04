import { ISongItem } from "../ISongItem";

export const fetchUri = async (songs : ISongItem[]) : Promise<ISongItem[]>  =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '94966d2417msh9ab231a24f37fccp146266jsn17eadde243c3',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
    songs = await Promise.all(songs.map(async (song) : Promise<ISongItem> =>
    {
        await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + song.artist + song.songName, options)
        .then(responce => responce.json())
        .then(data => {try{song.audioUri = data.data[0].preview; console.log(data.data[0].preview)} catch(error){console.log(song.artist+song.songName)}})
        return song;
    }
    ))
    return songs;
}