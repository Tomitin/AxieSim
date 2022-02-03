export type AxieType = 'beast' | 'plant' | 'bird' | 'aquatic' | 'reptile' | 'bug' | 'mech' | 'dawn' | 'dusk';
export type AxieTypeCapitalized = 'Beast' | 'Plant' | 'Bird' | 'Aquatic' | 'Reptile' | 'Bug' | 'Mech' | 'Dawn' | 'Dusk';
export type GeneType = 'ears' | 'eyes' | 'back' | 'mouth' | 'horn' | 'tail';
export type GeneTypeCapitalized = 'Ears' | 'Eyes' | 'Back' | 'Mouth' | 'Horn' | 'Tail';
export interface AxieData {
    id: number | string;
    breedCount?: number[];
    speed?: number[];
    pureness?: number;
    maxAxiePrice?: number;
    genes: any;
    axieClass: AxieType;
}
