import { ISongItem } from './ISongItem';


export class Player {
    song: ISongItem;
    constructor() {
        this.song = { id: 0, artist: '', songName: '', length: '', audioUri: '' };
    }
}
