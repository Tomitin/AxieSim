import React from 'react';
import { TreeStructure } from '../../../../models/breedingTree';
import DescendantsTreeComponent from './descendantsTree/descendantsTree';
import './treeContent.css';

interface TreeContentComponentProps {
    isAppLoading: boolean;
    selectedTreeId: string;
    forceMemoize?: boolean;
    treeStructure: TreeStructure;
    handleAxieUpdateClick: (axieId: string) => void;
    handleAxieDeleteClick: (axieId: string) => void;
    handleSearchParentsClick: (axieId: string, motherId: string, fatherId: string) => void;
}

let shouldMemoize = false;

const TreeContentComponent: React.FunctionComponent<TreeContentComponentProps> = (props: TreeContentComponentProps) => {
    return (
        <div className="tree-content">
            <DescendantsTreeComponent
                treeStructure={props.treeStructure}
                handleAxieUpdateClick={props.handleAxieUpdateClick}
                handleAxieDeleteClick={props.handleAxieDeleteClick}
            />
        </div>
    );
};

// Since looking into a recursive object(the tree structure) every time is very expensive, we only trigger re-renders in specific scenarios
export default React.memo(TreeContentComponent, (previousProps, newProps) => {
    // if user changed the selected tree, re-render the tree with the new data
    if (previousProps.selectedTreeId != newProps.selectedTreeId) {
        return false;
    }

    // If tree stopped loading data from server, trigger a re-render
    if (newProps.isAppLoading === true) {
        shouldMemoize = true;
    } else if (newProps.isAppLoading === false && shouldMemoize) {
        shouldMemoize = false;
        return false;
    }

    // Wildcard boolean parameter to trigger a re-render if needed
    if (!newProps.forceMemoize) {
        return false;
    }

    return true;
});
