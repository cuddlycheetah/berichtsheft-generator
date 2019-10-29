export interface Tagesbericht {
    uuid: any;
    _id?: string;
    id: number;
    start: number;
    ende: number;
    pause: number;
    erweitert: number;

    taetigkeiten: any[];

    krank: boolean;
    frei: string;
}
