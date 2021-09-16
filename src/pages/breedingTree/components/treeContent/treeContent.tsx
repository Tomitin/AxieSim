import React from 'react';
import { TreeStructure } from '../../../../models/breedingTree';
import AxieProfileComponent from '../axieProfile/axieProfile';
import './treeContent.css';

interface TreeContentComponentProps {
    selectedTreeId: string;
    treeStructure: TreeStructure;
    handleAxieUpdateClick: (axieId: string) => void;
}

let shouldMemoize = false;

const TreeContentComponent: React.FunctionComponent<TreeContentComponentProps> = (props: TreeContentComponentProps) => {
    const { id, parents, partners, breedCount, axieClass, axieGenes, children } = props.treeStructure;

    // console.log('axie id ' + id + 'with children', children);
    const hasChildren = children && children.length;
    return (
        <>
            {hasChildren ? (
                <div className={parents.length === 0 ? 'axie-family-spacer' : 'axie-child'}>
                    <div className="axie-parent-container">
                        <div className="axie-parent">
                            <AxieProfileComponent
                                axieGenes={axieGenes}
                                axieId={id}
                                size="medium"
                                breedCount={breedCount}
                                axieClass={axieClass}
                                onUpdateAxieClick={() => props.handleAxieUpdateClick(id)}
                            />
                        </div>
                    </div>
                    <div className="child-list-container">
                        {children.map((child) => (
                            <TreeContentComponent
                                key={child.id}
                                selectedTreeId={props.selectedTreeId}
                                treeStructure={{ ...child }}
                                handleAxieUpdateClick={props.handleAxieUpdateClick}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="axie-child">
                    <AxieProfileComponent
                        axieGenes={axieGenes}
                        axieId={id}
                        size="medium"
                        breedCount={breedCount}
                        axieClass={axieClass}
                        onUpdateAxieClick={() => props.handleAxieUpdateClick(id)}
                    />
                </div>
            )}
        </>
    );
};

export default React.memo(TreeContentComponent, (previousProps, newProps) => {
    // if user changed the selected tree, re-render the tree with the new data
    if (previousProps.selectedTreeId != newProps.selectedTreeId) {
        return false;
    }

    // If the component is destroyed because screen is on loading, that means new data is coming so force re-render once until new loading happens
    // TODO: find a better way since this depends on the if stament outside the component
    if (shouldMemoize == false) {
        shouldMemoize = true;
        return false;
    }

    return shouldMemoize;
});
