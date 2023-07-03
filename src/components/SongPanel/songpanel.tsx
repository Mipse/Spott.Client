import './songpanel.sass'
import {ISongItem} from '../../ISongItem'

const SongPanel = ({artist, songName, length} : ISongItem) => {
  return (
    <div id="SongPanel">
        <span id="PlayButton">
        11
        </span>
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