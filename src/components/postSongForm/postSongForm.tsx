import {useState} from 'react'
import './postSongForm.sass'

export const PostSongForm = () => {
    const [postSongArtist, SetPostSongArtist] = useState<string>("");
    const [postSongName, SetPostSongName] = useState<string>("");
    const [postSongLength, SetPostSongLength] = useState<string>("");

    let Post = () => {
        fetch("http://localhost:5012/songs",
            {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({"artist": postSongArtist,
            "name": postSongName,
            "length": postSongLength})         
            })
    }
  return (
    <div>
        <form>
            <h1>Artist</h1>
            <input type='text' value={postSongArtist} onChange={(e) => SetPostSongArtist(e.target.value)}/>
            <h1>Song Name</h1>
            <input type='text' value={postSongName} onChange={(e) => SetPostSongName(e.target.value)}/>
            <h1>Length</h1>
            <input type='text' value={postSongLength} onChange={(e) => SetPostSongLength(e.target.value)}/>
            <input id='submit' type='button' onClick={() => Post()} value='Click'>
            </input>
        </form>
    </div>
  )
}
