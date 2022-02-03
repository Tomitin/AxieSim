import { AxieChild } from '../models/state';
import { NestableObject, NestedObject } from './models';
import { TreeNode } from '../models/state';

export const mapAxieChildrenList = (childrenArray: AxieChild[]): string[] => {
    return childrenArray.map((axieChild: AxieChild) => axieChild.id);
};

/** Returns the link of the axie image.
 * mixed breed parameter is true when the axie to search is
 * dusk/mech/dawn
 */
export const getAxieImageSrc = (axieId: string, isMixedBreed: boolean): string => {
    if (isMixedBreed) {
        return 'https://storage.googleapis.com/axie-cdn/avatars/egg/egg-full-transparent.png';
    }
    return `https://storage.googleapis.com/assets.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png`;
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
    // This function is curried with the sole purpose of skipping typescript validation of an array
    const recursiveNest = (items: NestableObject[], rootItemId: string): NestedObject | [] => {
        const nested: NestedObject[] = [];
        let found = false;

        items.forEach((item) => {
            if (rootItemId === item.id) {
                found = true;
                const hasChildren = item.children.length > 0;
                nested.push({
                    ...item,
                    children: hasChildren ? item.children.flatMap((child) => nestObject(items, child)) : [],
                });
            }
        });

        // Before flatmap/found flag implementation, when the recursive function looked up a root child that didn't exist
        // inside the array, parent item looked like: [undefined, undefined, ...], the way this was solved was by
        // using flatmap since when it is returned [] flatmap ignores that child instead of returning undefined as before.
        if (found === false) {
            return [];
        }
        return nested[0];
    };
    return recursiveNest(items, rootItemId) as NestedObject;
};

export const capitalizeString = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
};

/**
 * From a tree with various branches-or subtrees- return a subtree array based on the root axie id
 */
export const filterAxieTreeArray = (flatTree: TreeNode[], filterAxieId: string, treeArray: string[] = []): string[] => {
    flatTree.map((axieTree) => {
        if (axieTree.source === filterAxieId) {
            treeArray.push(axieTree.source);
            axieTree.targets.map((axieTreeChildId) => filterAxieTreeArray(flatTree, axieTreeChildId, treeArray));
        }
    });

    return treeArray;
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
