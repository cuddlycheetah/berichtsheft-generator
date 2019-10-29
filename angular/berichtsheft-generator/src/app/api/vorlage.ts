import { Tagesbericht } from './tagesbericht';

export default interface Vorlage {
    uuid: string;
    name: string;
    tage: Tagesbericht[];
}
