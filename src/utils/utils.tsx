import { AxieChild } from '../models/axie';
import { NestableObject, NestedObject } from './models';

export const mapAxieChildrenList = (childrenArray: AxieChild[]): string[] => {
    return childrenArray.map((axieChild: AxieChild) => axieChild.id);
};

/**
 * Recursive function that given a flat array returns a nested object. Big O probably n**2
 *
 * Input example:
 *  items = [
 *      {id: 1, children: [2,3], ... },
 *      {id: 2, children: [], ... },
 *      {id: 3, children  [], ... }
 * ]
 *
 * rootItemId = 1
 *
 * */
export const nestObject = (items: NestableObject[], rootItemId: string): NestedObject => {
    const nested: NestedObject[] = [];

    items.forEach((item) => {
        if (rootItemId === item.id) {
            const hasChildren = item.children.length > 0;
            nested.push({
                ...item,
                children: hasChildren ? item.children.map((child) => nestObject(items, child)) : [],
            });
        }
    });

    return nested[0];
};

/** Returns a scale where the bredding tree can be seen completely from the user point of view. */
export const calculateVisibleTreeScale = (
    treeContainerWidth: number,
    treeScale: number,
    currentTreeWidth: number,
): number => {
    const unscaledTreeWidth = currentTreeWidth / treeScale;
    return treeContainerWidth / unscaledTreeWidth;
};

/** Returns the left position property centered based on the tree width */
export const calculateXCenteredPos = (containerWidth: number, treeScale: number, currentTreeWidth: number): number => {
    const unscaledTreeWidth = currentTreeWidth / treeScale;

    return unscaledTreeWidth / 2 - containerWidth / 2;
};

/** Returns the top position property centered based on the tree height and container height */
export const calculateYCenteredPos = (
    containerHeight: number,
    treeScale: number,
    currentTreeHeight: number,
): number => {
    const unscaledTreeHeight = currentTreeHeight / treeScale;

    return containerHeight / 2 - unscaledTreeHeight / 2;
};

export const downloadData = (data: string, linkNode: HTMLAnchorElement, filename: string): void => {
    if (data && linkNode) {
        // Convert data into a downloable file
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        linkNode.href = url;
        linkNode.download = `${filename}.json`;
        linkNode.type = 'application/json';
    }
};
