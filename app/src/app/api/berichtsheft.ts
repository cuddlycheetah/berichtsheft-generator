import { Wochenbericht } from './wochenbericht';

export interface Berichtsheft {
    uuid: string;
    name: string;
    start: Date;
    ende: Date;
    kwoffset: number;
    berichte: Wochenbericht[];
}
