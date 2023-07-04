import { ISongItem } from '../ISongItem'
import {makeInjector, DependencyInjector } from '@mindspace-io/utils'

export class Player{
    song: ISongItem
    constructor()
    {
        this.song = {artist: '', songName: '', length: '', audioUri: ''};
    }
}

export class PlayState{
    src: string
    isPlaying: boolean
    constructor(){
        this.src = ""
        this.isPlaying = false
    }
}

export const injector : DependencyInjector = makeInjector([
    {provide: Player, useClass: Player},
    {provide: Audio, useClass:Audio},
    {provide: PlayState, useClass: PlayState}
]);