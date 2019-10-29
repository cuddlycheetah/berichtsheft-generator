import { Tagesbericht } from './tagesbericht';

export interface Wochenbericht {
    free: boolean;

    uuid: string;
    id: number;

    tage: Tagesbericht[];

    kw: number;
    jahr: number;
}
