import { AxieTypeCapitalized, GeneTypeCapitalized } from './axie';

export interface TreeState {
    id: string;
    title: string;
    hierarchy: TreeNode[];
}

export interface TreeNode {
    source: string;
    targets: string[];
}

export interface BasicStats {
    hp: number;
    morale: number;
    speed: number;
    skill: number;
    __typename: string;
}

export interface OwnerProfile {
    name: string;
    __typename: string;
}

export interface Figure {
    image: string;
    model: string;
    atlas: string;
    __typename: string;
}

export interface AxieChild {
    image: string;
    stage: number;
    __typename: string;
    id: string;
    title: string;
    class: AxieTypeCapitalized;
}

export interface Auction {
    startingTimestamp: string;
    duration: string;
    seller: string;
    suggestedPrice: string;
    __typename: string;
    currentPrice: string;
    endingTimestamp: string;
    startingPrice: string;
    currentPriceUSD: string;
    listingIndex: number;
    timeLeft: string;
    endingPrice: string;
}

export interface AxieAbility {
    backgroundUrl: string;
    effectIconUrl: string;
    defense: number;
    attack: number;
    __typename: string;
    name: string;
    description: string;
    id: string;
    energy: number;
}

export interface AxiePart {
    abilities: AxieAbility[];
    stage: number;
    __typename: string;
    name: string;
    type: GeneTypeCapitalized;
    class: AxieTypeCapitalized;
}

export interface BattleInfo {
    banUntil: null | string | number;
    banned: boolean;
    level: number;
    banReason: null | string;
}

export interface AxieState {
    story_id: string;
    stats: BasicStats;
    ownerProfile: OwnerProfile | null;
    birthDate: number;
    figure: Figure;
    numMystic?: number;
    auction: Auction | null;
    breedCount: number;
    class: AxieTypeCapitalized;
    name: string;
    battleInfo?: BattleInfo;
    genes: string;
    owner: string;
    region?: string;
    id: string;
    pureness?: number;
    __typename: string;
    matronId: number;
    stage: number;
    sireId: number;
    sireClass: AxieTypeCapitalized;
    children: AxieChild[];
    refresh_time: number;
    parts: AxiePart[];
    bodyShape: string;
    level: number;
    chain?: string;
    insert_time?: number;
    newGenes?: string;
    title: string;
    matronClass: AxieTypeCapitalized;
    fromCache: boolean;
}
