import {makeInjector, DependencyInjector } from '@mindspace-io/utils'
import { Player } from '../entities/Player';
import { PlayState } from '../entities/PlayState';

export const injector : DependencyInjector = makeInjector([
    {provide: Player, useClass: Player},
    {provide: Audio, useClass:Audio},
    {provide: PlayState, useClass: PlayState}
]);