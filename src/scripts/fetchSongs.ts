import { ISongItem } from "../entities/ISongItem";

const fetchSong = async (song : ISongItem, options : any, retry : number) : Promise<ISongItem> =>{
  if (retry === 0) throw new Error("Cannot fetch")
        await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + song.artist + "%20" + song.songName, options)
        .then(responce => responce.json())
        .then(data => {try{song.audioUri = data.data[0].preview; song.imageSrc = data.data[0].album.cover; console.log(data.data[0].preview)} catch(error){console.log(song.artist+song.songName); fetchSong(song, options, retry - 1).then(s => song = s)}})
        return song;
}

export const fetchUri = async (songs : ISongItem[]) : Promise<ISongItem[]>  =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
    let x : number = 0;
    songs = await Promise.all(songs.map(async (song) : Promise<ISongItem> =>
    {
        song.id = x++;
        return await fetchSong(song, options, 5);
    }
    ))
    return songs;
}