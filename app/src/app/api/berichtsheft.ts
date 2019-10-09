import { Wochenbericht } from './wochenbericht';

export interface Berichtsheft {
    uuid: string;
    name: string;
    kwoffset: number;
    berichte: Wochenbericht[];
}
