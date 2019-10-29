export interface Tagesbericht {
    uuid: string;
    id: string;
    start: number;
    ende: number;
    pause: number;
    erweitert: number;

    taetigkeiten: any[];

    krank: boolean;
    frei: string;
}
