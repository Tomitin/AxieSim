export interface NestableObject {
    id: string;
    [key: string]: unknown;
    children: string[];
}

export interface NestedObject {
    id: string;
    [key: string]: unknown;
    children: NestedObject[];
}
