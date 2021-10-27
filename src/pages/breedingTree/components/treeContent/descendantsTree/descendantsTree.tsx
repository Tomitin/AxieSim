import React from 'react';
import { TreeStructure } from '../../../../../models/breedingTree';
import AxieProfileComponent from '../../axieProfile/axieProfile';
import './descendantsTree.css';

interface DescendantsTreeComponentProps {
    treeStructure: TreeStructure;
    handleAxieUpdateClick: (axieId: string) => void;
    handleAxieDeleteClick: (axieId: string) => void;
}

const DescendantsTreeComponent: React.FunctionComponent<DescendantsTreeComponentProps> = (
    props: DescendantsTreeComponentProps,
) => {
    const { id, parents, breedCount, axieClass, children, partners, isTreeRoot } = props.treeStructure;
    const hasChildren = children && children.length;
    return (
        <>
            {hasChildren ? (
                <div className={parents.length === 0 ? 'axie-family-spacer' : 'axie-child'}>
                    <div className="axie-parent-container">
                        <div className="axie-parent">
                            <AxieProfileComponent
                                axieId={id}
                                size="medium"
                                axieClass={axieClass}
                                onUpdateAxieClick={() => props.handleAxieUpdateClick(id)}
                                onDeleteAxieClick={isTreeRoot ? undefined : () => props.handleAxieDeleteClick(id)}
                            />
                        </div>
                        {partners.map((partnerId) => (
                            <div className="axie-parent" key={partnerId}>
                                <AxieProfileComponent axieId={partnerId} size="medium" />
                            </div>
                        ))}
                    </div>
                    <div className="child-list-container">
                        {children.map((child) => (
                            <DescendantsTreeComponent
                                key={child.id}
                                treeStructure={{ ...child }}
                                handleAxieUpdateClick={props.handleAxieUpdateClick}
                                handleAxieDeleteClick={props.handleAxieDeleteClick}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="axie-child">
                    <AxieProfileComponent
                        axieId={id}
                        size="medium"
                        axieClass={axieClass}
                        onDeleteAxieClick={isTreeRoot ? undefined : () => props.handleAxieDeleteClick(id)}
                        onUpdateAxieClick={() => props.handleAxieUpdateClick(id)}
                    />
                </div>
            )}
        </>
    );
};

export default DescendantsTreeComponent;
