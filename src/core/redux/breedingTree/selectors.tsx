import { createSelector } from 'reselect';
import { AxieGenes, makeTreeStructure, TreeNode, TreeStructure } from '../../../models/breedingTree';
import { NestableObject } from '../../../utils/models';
import { nestObject } from '../../../utils/utils';

const getAxiesByIdSelector = (state: any) => state.breedingTreeApp.axies.byId;
const getTreeListSelector = (state: any) => state.breedingTreeApp.trees;

export const getIsNewTreeSelected = createSelector(
    (state: any) => state.breedingTreeApp.trees.isNewTreeSelected,
    (isNewTreeSelected) => isNewTreeSelected,
);

export const getTreeDisplayData = createSelector([getAxiesByIdSelector, getTreeListSelector], (axiesById, trees) => {
    const selectedTreeId = trees.treeSelected;
    const selectedTree = trees.byId[selectedTreeId];
    if (!selectedTree && !selectedTreeId) {
        return makeTreeStructure({});
    }
    if (selectedTree.hierarchy.length === 0) return makeTreeStructure({});
    const flatTreeDisplayData: NestableObject[] = selectedTree.hierarchy.map((axieHierarchy: TreeNode) => {
        return {
            id: axieHierarchy.source,
            children: axieHierarchy.targets,
            axieGenes: axiesById[axieHierarchy.source].traits as AxieGenes,
            breedCount: axiesById[axieHierarchy.source].breedCount as number,
            axieClass: axiesById[axieHierarchy.source].class as string,
            parents: [],
            partners: [],
        };
    });

    // Probably should be added as a variable inside the state
    const rootNode = selectedTree.hierarchy[0];

    const nestedTreedisplayData = nestObject(flatTreeDisplayData, rootNode.source);
    return nestedTreedisplayData as unknown as TreeStructure;
});

export const getSelectedTreeId = createSelector(
    (state: any) => state.breedingTreeApp.trees.treeSelected,
    (treeSelected) => treeSelected,
);

export const getIsAppLoading = createSelector(
    (state: any) => state.breedingTreeApp.isLoading,
    (isLoading) => isLoading,
);

export const getSelectedTree = createSelector(
    (state: any) => state.breedingTreeApp.trees,
    (trees) => trees.byId[trees.treeSelected],
);

export const getAxiesList = createSelector(
    (state: any) => state.breedingTreeApp.axies,
    (axies) => {
        const axiesList = axies.allIds.map((id: string) => {
            return axies.byId[id];
        });
        return axiesList;
    },
);

export const getTreeList = createSelector(
    (state: any) => state.breedingTreeApp.trees,
    (trees) => {
        const treesList = trees.allIds.map((id: string) => {
            return trees.byId[id];
        });
        return treesList;
    },
);
