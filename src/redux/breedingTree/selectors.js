import { createSelector } from 'reselect';

export const getIsNewTreeSelected = createSelector(
    (state) => state.breedingTreeApp.isNewTreeSelected,
    (isNewTreeSelected) => isNewTreeSelected,
);

// export const getTreeDisplayData = createSelector(
//     (state) => ({ treeList: state.breedingTreeApp.trees, treeSelected: state.breedingTreeApp.treeSelected }),
//     (slicedState) =>
//         slicedState.treeList
//             .filter((tree) => tree.id === slicedState.treeSelected)
//             .map((selectedTreeData) => {
//                 return [selectedTreeData.hierarchy.axieId];
//             }),
// );

export const getSelectedTreeId = createSelector(
    (state) => state.breedingTreeApp.treeSelected,
    (treeSelected) => treeSelected,
);

export const getIsAppLoading = createSelector(
    (state) => state.breedingTreeApp.isLoading,
    (isLoading) => isLoading,
);

export const getAxiesList = createSelector(
    (state) => state.breedingTreeApp.axies,
    (axies) => axies,
);

export const getTreeList = createSelector(
    (state) => state.breedingTreeApp.trees,
    (trees) =>
        trees.map((tree) => {
            return {
                id: tree.id,
                title: tree.title,
            };
        }),
);
