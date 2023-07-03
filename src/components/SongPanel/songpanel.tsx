import './songpanel.sass'
import {ISongItem} from '../../ISongItem'

const SongPanel = ({artist, songName, length} : ISongItem) => {
  return (
    <div id="SongPanel">
        <img src="https://cdn-icons-png.flaticon.com/512/17/17550.png" alt='button' role='button' onClick={() => console.log('11')}/>
        <span id="InfoLength">
          <span id="Info">
              <h3>{artist}</h3>
              <h4>{songName}</h4>
          </span>
          <span id='Length'>
            <h1>{length}</h1>
          </span>
        </span>
    </div>
  )
}

export default SongPanel