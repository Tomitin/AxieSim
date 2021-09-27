import { AxieType, GeneType } from './axie';

export interface GenesInformation {
    partId: string;
    class: AxieType;
    specialGenes?: boolean | null;
    type: GeneType;
    name: string;
}

export interface Genes {
    d: GenesInformation;
    r1: GenesInformation;
    r2: GenesInformation;
    mystic?: boolean;
}

export interface BinaryGenes {
    d: string;
    r1: string;
    r2: string;
}

export interface AxieGenes {
    cls: AxieType;
    region: string;
    color: BinaryGenes;
    pattern: BinaryGenes;
    eyes: Genes;
    ears: Genes;
    back: Genes;
    mouth: Genes;
    horn: Genes;
    tail: Genes;
}

export interface TreeStructure {
    id: string;
    parents: string[];
    partners: string[];
    breedCount: number;
    axieClass?: AxieType;
    isTreeRoot: boolean;
    // axieGenes: AxieGenes;
    children: TreeStructure[];
}

export interface GenesInformation {
    partId: string;
    class: AxieType;
    specialGenes?: boolean | null;
    type: GeneType;
    name: string;
}

export function makeGenesInformation(data: Partial<GenesInformation>): GenesInformation {
    const defaultValue: GenesInformation = {
        partId: '',
        class: 'aquatic',
        specialGenes: false,
        type: 'back',
        name: '',
    };

    return { ...defaultValue, ...data };
}

export function makeGenes(data: Partial<Genes>): Genes {
    const defaultValue: Genes = {
        d: makeGenesInformation({}),
        r1: makeGenesInformation({}),
        r2: makeGenesInformation({}),
        mystic: false,
    };

    return { ...defaultValue, ...data };
}

export function makeBinaryGenes(data: Partial<BinaryGenes>): BinaryGenes {
    const defaultValue: BinaryGenes = {
        d: '',
        r1: '',
        r2: '',
    };

    return { ...defaultValue, ...data };
}

export function makeAxieGenes(data: Partial<AxieGenes>): AxieGenes {
    const defaultValue: AxieGenes = {
        cls: 'aquatic',
        region: '',
        color: makeBinaryGenes({}),
        pattern: makeBinaryGenes({}),
        eyes: makeGenes({}),
        ears: makeGenes({}),
        back: makeGenes({}),
        mouth: makeGenes({}),
        horn: makeGenes({}),
        tail: makeGenes({}),
    };

    return { ...defaultValue, ...data };
}

export function makeTreeStructure(data: Partial<TreeStructure>): TreeStructure {
    const defaultValue: TreeStructure = {
        id: '',
        parents: [],
        partners: [],
        breedCount: 0,
        axieClass: 'aquatic',
        isTreeRoot: false,
        // axieGenes: makeAxieGenes({}),
        children: [],
    };

    return { ...defaultValue, ...data };
}
