import { IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addAxieToSelectedTree,
    addNewState,
    removeAxieSubtree,
    updateAxieBreeds,
} from '../../../../core/redux/breedingTree/actions';
import { getIsAppLoading, getSelectedTree, getTreeDisplayData } from '../../../../core/redux/breedingTree/selectors';
import { TreeStructure } from '../../../../models/breedingTree';
import {
    calculateVisibleTreeScale,
    calculateXCenteredPos,
    calculateYCenteredPos,
    downloadData,
} from '../../../../utils/utils';
import TreeContentComponent from '../../components/treeContent/treeContent';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import './tree.css';
import UploadFileComponent from '../../../../components/uploadFile/uploadFile';
import { TreeNode } from '../../../../models/state';
import DialogComponent from '../../../../components/dialog/dialog';

const TreeComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const isAppLoading: boolean = useSelector((state) => getIsAppLoading(state));
    const selectedTree = useSelector((state) => getSelectedTree(state));
    const treeDisplayData: TreeStructure = useSelector((state) => getTreeDisplayData(state));
    const [isPanning, setIsPanning] = React.useState<boolean>(false);
    const [axieToDelete, setAxieToDelete] = React.useState<string>('');
    const [isDeleteAxieModalOpen, setIsDeleteAxieModalOpen] = React.useState<boolean>(false);
    const [startPoint, setStartPoint] = React.useState({ x: 0, y: 0, viewBoxX: 0, viewBoxY: 0 });
    const [forceTreeMemoization, setForceTreeMemoization] = React.useState<boolean>(true);
    const breedingTreeElement = useRef<HTMLDivElement>(null);
    const [viewBox, setViewBox] = React.useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        containerWidth: 0,
        containerHeight: 0,
    });
    const [scale, setScale] = React.useState<number>(1);
    const [treeOffset, setTreeOffset] = React.useState({
        horizontal: { byZoom: 0, byPanning: 0, lastHorizontalOffset: 0 },
        vertical: { byZoom: 0, byPanning: 0 },
    });
    const saveTreeLink = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        setTreeDefaultState();
    }, [selectedTree]);

    useEffect(() => {
        setTreeDefaultState();
    }, []);

    const setTreeDefaultState = () => {
        const breedingTreeNode = breedingTreeElement.current;
        if (!!breedingTreeNode && !!breedingTreeNode.parentElement) {
            const breedingTreeRect = breedingTreeNode.getBoundingClientRect();
            const breedingTreeContainerRect = breedingTreeNode.parentElement.getBoundingClientRect();

            const unscaledTreeWidth = breedingTreeRect.width / scale;
            const unscaledTreeHeight = breedingTreeRect.height / scale;

            const treeScale = breedingTreeContainerRect.width / unscaledTreeWidth;
            const xPos =
                calculateXCenteredPos(breedingTreeContainerRect.width, treeScale, unscaledTreeWidth * treeScale) * -1;
            const yPos = calculateYCenteredPos(
                breedingTreeContainerRect.height,
                treeScale,
                unscaledTreeHeight * treeScale,
            );
            setScale(treeScale);

            setViewBox({
                ...viewBox,
                x: xPos,
                y: yPos,
                width: unscaledTreeWidth * treeScale,
                height: unscaledTreeHeight * treeScale,
                containerWidth: breedingTreeContainerRect.width,
                containerHeight: breedingTreeContainerRect.height,
            });
            //TODO: Move to state
        }
    };

    const handleSearchParentsClick = () => {
        console.log('s');
    };

    const handleAxieUpdateClick = (axieId: string) => {
        const isAxieTreeNotAdded = selectedTree.hierarchy.every(
            (axieHierarchy: TreeNode) => axieHierarchy.source !== axieId,
        );
        if (isAxieTreeNotAdded) {
            dispatch(addAxieToSelectedTree({ axieId, childrenList: [] }));
        }
        const axieIdHierarchy = selectedTree.hierarchy.find(
            (axieHierarchy: TreeNode) => axieHierarchy.source === axieId,
        );
        if (axieIdHierarchy) {
            const childrenAlreadyAdded = axieIdHierarchy.targets;
            dispatch(updateAxieBreeds({ axieId, childrenAlreadyAdded }));
        }
    };

    const reloadTreeComponent = () => {
        setForceTreeMemoization(false);
        setTimeout(() => setForceTreeMemoization(true), 0);
    };

    const getCenterMousePos = (wheelEvent: React.WheelEvent, horizontalDirection: boolean): number => {
        const mousePos = horizontalDirection ? wheelEvent.nativeEvent.x : wheelEvent.nativeEvent.y;

        /* Offset calculated by content being in right bottom corner */
        const horizontalOffset = document.body.clientWidth - viewBox.containerWidth;
        const verticalOffset = document.body.clientHeight - viewBox.containerHeight;

        const containerOffset = horizontalDirection ? horizontalOffset : verticalOffset;

        /* Top left of container means 0x0 - widthxheight */
        const mouseRelativePos = mousePos - containerOffset;

        const horizontalCenter = viewBox.containerWidth / 2;
        const verticalCenter = viewBox.containerHeight / 2;
        const containerCenter = horizontalDirection ? horizontalCenter : verticalCenter;

        /* Top left is -(width|height)/2 and center is 0  */
        const mouseRelativeCenteredPos = mouseRelativePos - containerCenter;

        return mouseRelativeCenteredPos;
    };

    const handleBreedingTreeWheel = (event: React.WheelEvent) => {
        // Solution by: https://stackoverflow.com/questions/52576376/how-to-zoom-in-on-a-complex-svg-structure
        const mouseWheelDirection = Math.sign(-event.deltaY);

        // Used as a variable that grows/shrinks in a linear dependence with height-width
        const decreasedWidth = viewBox.width * 0.05;
        const decreasedHeight = viewBox.height * 0.05;

        // When the mouse wheel goes downwards, deltaWidth/Height will be negative
        const deltaWidth = mouseWheelDirection * decreasedWidth;
        const deltaHeight = mouseWheelDirection * decreasedHeight;

        // This means: as viewbox width gets smaller in comparison to the original viewbox width, the scale will be smaller and viceversa
        const newScale = (viewBox.width + deltaWidth) / (viewBox.width / scale);

        const mouseRelativeCenteredHorizontalPos = getCenterMousePos(event, true) + treeOffset.horizontal.byPanning;
        const mouseRelativeCenteredVerticalPos = getCenterMousePos(event, false) + treeOffset.vertical.byPanning;

        // Tells how much the tree should move in left and top
        const deltaX = (mouseRelativeCenteredHorizontalPos * deltaWidth) / viewBox.containerWidth;
        const deltaY = (mouseRelativeCenteredVerticalPos * deltaHeight) / viewBox.containerHeight;

        setScale(newScale);
        setViewBox({
            ...viewBox,
            x: viewBox.x - deltaX,
            y: viewBox.y - deltaY,
            width: viewBox.width + deltaWidth,
            height: viewBox.height + deltaHeight,
        });
    };

    const handleBreedingTreeMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsPanning(true);
        setStartPoint({
            x: event.nativeEvent.x,
            y: event.nativeEvent.y,
            viewBoxX: viewBox.x,
            viewBoxY: viewBox.y,
        });
    };

    const handleBreedingTreeMouseMove = (event: React.MouseEvent) => {
        if (isPanning) {
            // Important to see that in this case it's being used nativeEvent.x because it returns
            // a position relative to screen size and not offset from where it was clicked.
            // This caused bugs when substracting start point and end point
            const deltaX = event.nativeEvent.x - startPoint.x;
            const deltaY = event.nativeEvent.y - startPoint.y;
            setViewBox({
                ...viewBox,
                x: startPoint.viewBoxX + deltaX,
                y: startPoint.viewBoxY + deltaY,
            });
        }
    };

    const handleZoomClick = (zoomType: 'in' | 'out') => {
        const zoomDirection: number = zoomType === 'in' ? 1 : -1;

        // Used as a variable that grows/shrinks in a linear dependence with height-width
        const decreasedWidth = viewBox.width * 0.25;
        const decreasedHeight = viewBox.height * 0.25;

        // When the mouse wheel goes down, deltawidth will be negative
        const deltaWidth = zoomDirection * decreasedWidth;
        const deltaHeight = zoomDirection * decreasedHeight;

        // This means: as viewbox width gets smaller in comparison to the original viewbox width, the scale will be smaller and viceversa
        setScale((viewBox.width + deltaWidth) / (viewBox.width / scale));
        setViewBox({
            ...viewBox,
            width: viewBox.width + deltaWidth,
            height: viewBox.height + deltaHeight,
        });
    };

    const handleZoomOutMapClick = () => {
        setTreeOffset({
            horizontal: {
                ...treeOffset.horizontal,
                byPanning: 0,
                byZoom: 0,
            },
            vertical: {
                byPanning: 0,
                byZoom: 0,
            },
        });
        const visibleTreeScale = calculateVisibleTreeScale(viewBox.containerWidth, scale, viewBox.width);

        const centeredLeftPos = calculateXCenteredPos(viewBox.containerWidth, scale, viewBox.width) * -1;
        const centeredTopPos = calculateYCenteredPos(viewBox.containerHeight, scale, viewBox.height);
        const unscaledWidth = viewBox.width / scale;
        const unscaledHeight = viewBox.height / scale;

        setScale(visibleTreeScale);
        setViewBox({
            ...viewBox,
            x: centeredLeftPos,
            y: centeredTopPos,
            width: unscaledWidth * visibleTreeScale,
            height: unscaledHeight * visibleTreeScale,
        });
    };

    const handleBreedingTreeMouseUp = (event: React.MouseEvent) => {
        const deltaX = event.nativeEvent.x - startPoint.x;
        const deltaY = event.nativeEvent.y - startPoint.y;

        setIsPanning(false);

        setTreeOffset({
            horizontal: {
                ...treeOffset.horizontal,
                byPanning: treeOffset.horizontal.byPanning - deltaX,
            },
            vertical: {
                ...treeOffset.vertical,
                byPanning: treeOffset.vertical.byPanning - deltaY,
            },
        });
    };

    const handleBreedingTreeMouseLeave = () => {
        setIsPanning(false);
    };

    const handleDownloadTreeClick = () => {
        const state = localStorage.getItem('state');
        if (state && saveTreeLink.current) {
            downloadData(state, saveTreeLink.current, 'bredding_tree');
        }
    };

    const handleUploadTreeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event != null && event.target != null && !event.target.files) return;

        const files = event.target.files;
        if (files !== null) {
            //from all the files the user selected, pick the first one
            const file = files[0];
            const fileReader = new FileReader();
            // 2.When it finishes to read the file, execute the function to get the data
            fileReader.onload = (() => (event: ProgressEvent<FileReader>) => {
                if (!!event.target) {
                    const json = event.target.result;
                    if (!!json) {
                        const parsedState = JSON.parse(json.toString());
                        dispatch(addNewState({ state: parsedState.breedingTreeApp }));
                    }
                }
            })();
            // 1.Read the file
            fileReader.readAsText(file);
        }
    };

    /* delete axie modal */

    const handleAxieDeleteTreeClick = (axieId: string) => {
        setIsDeleteAxieModalOpen(true);
        setAxieToDelete(axieId);
    };

    const handleDeleteAxieModalClose = () => {
        setIsDeleteAxieModalOpen(false);
    };

    const handleDeleteAxieConfirm = () => {
        setIsDeleteAxieModalOpen(false);
        dispatch(removeAxieSubtree({ axieId: axieToDelete }));
        //Re-render tree
        reloadTreeComponent();
    };

    return (
        <div className="tree-component">
            {!selectedTree && (
                <div className="empty-tree-container">
                    <Typography variant="h2">No breeding tree selected.</Typography>
                </div>
            )}
            {!!selectedTree && (
                <div
                    className="breeding-tree-container"
                    onWheel={handleBreedingTreeWheel}
                    onMouseDown={handleBreedingTreeMouseDown}
                    onMouseMove={handleBreedingTreeMouseMove}
                    onMouseLeave={handleBreedingTreeMouseLeave}
                    onMouseUp={handleBreedingTreeMouseUp}
                >
                    <div className="axie-search"></div>
                    <div className="middle-point-container"></div>
                    <div
                        className="breeding-tree"
                        style={{ left: viewBox.x, top: viewBox.y, transform: `scale(${scale})` }}
                        ref={breedingTreeElement}
                    >
                        <TreeContentComponent
                            isAppLoading={isAppLoading}
                            handleSearchParentsClick={handleSearchParentsClick}
                            handleAxieUpdateClick={handleAxieUpdateClick}
                            handleAxieDeleteClick={handleAxieDeleteTreeClick}
                            treeStructure={treeDisplayData}
                            selectedTreeId={selectedTree.id}
                            forceMemoize={forceTreeMemoization}
                        />
                        <div className="middle-point-test"></div>
                    </div>
                    <div className="files-tools-container">
                        <a ref={saveTreeLink}>
                            <IconButton className="file-tool" color="primary" onClick={handleDownloadTreeClick}>
                                <CloudDownloadIcon titleAccess="Download data" />
                            </IconButton>
                        </a>
                        <UploadFileComponent onChange={handleUploadTreeClick} />
                    </div>
                    <div className="zoom-tools-container">
                        <IconButton className="zoom-tool" color="primary" onClick={() => handleZoomClick('in')}>
                            <ZoomInIcon titleAccess="Zoom in" />
                        </IconButton>
                        <IconButton className="zoom-tool" color="primary" onClick={() => handleZoomClick('out')}>
                            <ZoomOutIcon titleAccess="Zoom out" />
                        </IconButton>
                        <IconButton className="zoom-tool" color="primary" onClick={handleZoomOutMapClick}>
                            <ZoomOutMapIcon titleAccess="Zoom out map" />
                        </IconButton>
                    </div>
                </div>
            )}

            <DialogComponent
                title="Are you sure?"
                description="You can obtain the data again by searching children on axie's parent."
                isOpen={isDeleteAxieModalOpen}
                acceptButtontitle="Delete"
                closeButtontitle="Cancel"
                handleAccept={handleDeleteAxieConfirm}
                handleClose={handleDeleteAxieModalClose}
            />
        </div>
    );
};

export default TreeComponent;
