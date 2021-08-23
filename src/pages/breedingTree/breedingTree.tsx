import {
    Box,
    Divider,
    Typography,
    TextField,
    FormControl,
    Input,
    InputLabel,
    Button,
    IconButton,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import './breedingTree.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTreeForm, deleteTree, submitNewTreeForm, updateTreeSelected } from '../../redux/breedingTree/actions';
import {
    getAxiesList,
    getIsAppLoading,
    getIsNewTreeSelected,
    getSelectedTreeId,
    getTreeList,
} from '../../redux/breedingTree/selectors';
import AddIcon from '@material-ui/icons/Add';
import DialogComponent from '../../components/dialog/dialog';
import SnackbarComponent from '../../components/snackbar/snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TreePreviewComponent from './components/treePreview/treePreview';
import AxieProfileComponent from './components/axieProfile/axieProfile';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import PublishIcon from '@material-ui/icons/Publish';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const BreedingTree: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const isNewTreeSelected = useSelector((state) => getIsNewTreeSelected(state));
    const axiesList = useSelector((state) => getAxiesList(state));
    const isAppLoading = useSelector((state) => getIsAppLoading(state));
    const treeList = useSelector((state) => getTreeList(state));
    const selectedTreeId = useSelector((state) => getSelectedTreeId(state));
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
    const [searchTreesForm, setSearchTreesForm] = React.useState('');
    const [filteredTreeList, setFilteredTreeList] = React.useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [treeIdToDelete, setTreeIdToDelete] = React.useState('');
    const [snackBarMessage, setSnackbarMessage] = React.useState('');
    const [newTreeForm, setNewTreeForm] = React.useState({
        treeName: '',
        axieOne: '',
    });

    const svgContainerElement = useRef<HTMLDivElement>(null);
    const [viewBox, setViewBox] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isPanning, setIsPanning] = React.useState(false);
    const [startPoint, setStartPoint] = React.useState({ x: 0, y: 0, viewBoxX: 0, viewBoxY: 0 });
    const [scale, setScale] = React.useState(1);
    const saveTreeLink = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const svgContainer = svgContainerElement.current;
        if (svgContainerElement && svgContainer) {
            setViewBox({
                ...viewBox,
                width: svgContainer.clientWidth,
                height: svgContainer.clientHeight,
            });
        }
    }, []);

    // Scroll to top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const filteredTrees = treeList.filter((tree: any) => tree.title.toLowerCase().includes(searchTreesForm));

        setFilteredTreeList(filteredTrees);
    }, [searchTreesForm, treeList]);

    /* Snackbar */

    const handleSnackbarOpen = (message: string) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    /* Delete tree modal */

    const handleClickDeleteModal = (treeId: string) => {
        setDeleteModalOpen(true);
        setTreeIdToDelete(treeId);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleAcceptDeleteModal = () => {
        dispatch(deleteTree({ treeId: treeIdToDelete }));
        setDeleteModalOpen(false);
        handleSnackbarOpen('Tree deleted successfully');
    };

    /* Search trees */

    const handleSearchTreesFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTreesForm(event.target.value);
    };

    /* Breeding tree */

    const handleBreedingTreeWheel = (event: React.WheelEvent) => {
        // Solution by: https://stackoverflow.com/questions/52576376/how-to-zoom-in-on-a-complex-svg-structure
        if (svgContainerElement.current) {
            const svgContainerWidth = svgContainerElement.current.clientWidth;
            const svgContainerHeight = svgContainerElement.current.clientHeight;
            const svgContainerWidthCenter = svgContainerWidth / 2;
            const svgContainerHeightCenter = svgContainerHeight / 2;
            const mouseWheelDirection = Math.sign(-event.deltaY);

            // Used as a variable that grows/shrinks in a linear dependence with height-width
            const decreasedWidth = viewBox.width * 0.1;
            const decreasedHeight = viewBox.height * 0.1;
            const deltaWidth = mouseWheelDirection * decreasedWidth;
            const deltaHeight = mouseWheelDirection * decreasedHeight;

            // Grows/shrinks from the center of the container
            const deltaX = (deltaWidth * svgContainerWidthCenter) / svgContainerWidth;
            const deltaY = (deltaHeight * svgContainerHeightCenter) / svgContainerHeight;
            setViewBox({
                x: viewBox.x + deltaX,
                y: viewBox.y + deltaY,
                width: viewBox.width - deltaWidth,
                height: viewBox.height - deltaHeight,
            });
            setScale(viewBox.width / svgContainerWidth);
        }
    };

    const handleBreedingTreeMouseDown = (event: React.MouseEvent) => {
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
            const deltaX = (event.nativeEvent.x - startPoint.x) * scale;
            const deltaY = (event.nativeEvent.y - startPoint.y) * scale;
            setViewBox({
                x: startPoint.viewBoxX - deltaX,
                y: startPoint.viewBoxY - deltaY,
                width: viewBox.width,
                height: viewBox.height,
            });
        }
    };

    const handleZoomClick = (zoomType: 'in' | 'out') => {
        if (svgContainerElement.current) {
            const zoomDirection: number = zoomType === 'in' ? 1 : -1;
            const svgContainerWidth = svgContainerElement.current.clientWidth;
            const svgContainerHeight = svgContainerElement.current.clientHeight;
            const svgContainerWidthCenter = svgContainerWidth / 2;
            const svgContainerHeightCenter = svgContainerHeight / 2;

            // Used as a variable that grows/shrinks in a linear dependence with height-width
            const decreasedWidth = svgContainerWidth * 0.25 * zoomDirection;
            const decreasedHeight = svgContainerHeight * 0.25 * zoomDirection;

            // Grows/shrinks from the center of the center of the container
            const deltaX = (decreasedWidth * svgContainerWidthCenter) / svgContainerWidth;
            const deltaY = (decreasedHeight * svgContainerHeightCenter) / svgContainerHeight;
            setScale(viewBox.width / svgContainerWidth);
            setViewBox({
                x: viewBox.x + deltaX,
                y: viewBox.y + deltaY,
                width: viewBox.width - decreasedWidth,
                height: viewBox.height - decreasedHeight,
            });
        }
    };

    const handleZoomOutMapClick = () => {
        console.log('');
    };

    const handleBreedingTreeMouseUp = () => {
        setIsPanning(false);
    };

    const handleBreedingTreeMouseLeave = () => {
        setIsPanning(false);
    };

    const handleDownloadTreeClick = () => {
        const state = localStorage.getItem('state');
        if (state && saveTreeLink.current != null) {
            const downloadData = state;
            // Convert data into a downloable file
            const blob = new Blob([downloadData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            saveTreeLink.current.href = url;
            saveTreeLink.current.download = 'FamilyTree.json';
            saveTreeLink.current.type = 'application/json';
        }
    };

    const handleUploadTreeClick = (event: React.MouseEvent) => {
        console.log('');
        // if (!event.target.files[0]) return;
        // clearCanvas();
        // dispatch(restartGraph());
        // //from all the files the user selected, pick the first one
        // const files = event.target.files;
        // const file = files[0];

        // const fileReader = new FileReader();
        // // 2.When it finishes to read the file, execute the function to get the data
        // fileReader.onload = (() => (event) => {
        //     const json = event.target.result;
        //     const parsedGraph = JSON.parse(json);
        //     dispatch(addGraph(parsedGraph));
        // })();
        // // 1.Read the file
        // fileReader.readAsText(file);
    };

    const handleNewTreeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;

            setNewTreeForm({
                ...newTreeForm,
                [name]: value,
            });
        }
    };

    const handleNewTreeFormClick = () => {
        dispatch(addNewTreeForm());
    };

    const handleTreeClick = (treeId: string) => {
        dispatch(updateTreeSelected({ treeId }));
    };

    const handleCreateTreeSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(submitNewTreeForm({ axieId: newTreeForm.axieOne, newTreeForm }));
    };

    return (
        <div className="bredding-tree-app">
            <Box className="aside-menu" boxShadow={5}>
                <Box className="title-container">
                    <Typography align="center" variant="h3" component="h2">
                        My trees
                    </Typography>
                </Box>
                <Divider />
                <Box className="trees-form-container">
                    <TextField
                        id="outlined-search"
                        label="Search a tree"
                        placeholder="Example: rimp donut"
                        type="search"
                        variant="outlined"
                        onChange={handleSearchTreesFormChange}
                        value={searchTreesForm}
                    />
                    <Box className="trees-list-container">
                        <Box className="trees-list">
                            <Box
                                className={`tree-container ${
                                    isNewTreeSelected ? 'add-tree-container-selected' : 'add-tree-container'
                                }`}
                                onClick={handleNewTreeFormClick}
                            >
                                <Box className="plus-icon-container">
                                    <AddIcon />
                                </Box>
                                <Typography className="add-tree-text" align="center" variant="h6">
                                    New tree
                                </Typography>
                            </Box>
                            {!!filteredTreeList.length &&
                                filteredTreeList.map((tree: any) => (
                                    <Box boxShadow={1} key={tree.id} className="tree-container">
                                        <TreePreviewComponent
                                            isSelected={selectedTreeId === tree.id && !isNewTreeSelected}
                                            title={tree.title}
                                            handleDeleteTreeClick={() => handleClickDeleteModal(tree.id)}
                                            handleClick={() => handleTreeClick(tree.id)}
                                        />
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="breeding-tree-container">
                {/* <Box className="empty-tree-container">
                    <Typography variant="h2">No breeding tree selected.</Typography>
                </Box> */}
                {isNewTreeSelected && (
                    <Box className="new-tree-container">
                        <form onSubmit={handleCreateTreeSubmit} className="new-tree-form">
                            <Typography variant="h4" align="center">
                                New tree
                            </Typography>
                            <Box margin="8px 0">
                                <FormControl required={true} fullWidth={true}>
                                    <InputLabel htmlFor="tree-name">Tree name</InputLabel>
                                    <Input
                                        name="treeName"
                                        placeholder="Example: terminator"
                                        id="tree-name"
                                        onChange={handleNewTreeInputChange}
                                        value={newTreeForm.treeName}
                                        autoComplete="off"
                                    />
                                </FormControl>
                            </Box>
                            <Box marginBottom="8px">
                                <FormControl required={true} fullWidth={true}>
                                    <InputLabel htmlFor="axie-one-input">Axie id</InputLabel>
                                    <Input
                                        type="number"
                                        name="axieOne"
                                        placeholder="Enter axie id you want to breed"
                                        id="axie-one-input"
                                        onChange={handleNewTreeInputChange}
                                        value={newTreeForm.axieOne}
                                        autoComplete="off"
                                    />
                                </FormControl>
                            </Box>
                            <Box marginTop="16px" display="flex" justifyContent="center">
                                <Button type="submit" color="primary" variant="contained">
                                    Create tree
                                </Button>
                            </Box>
                        </form>
                    </Box>
                )}
                {!!selectedTreeId && (
                    <div
                        ref={svgContainerElement}
                        className="breeding-tree"
                        onWheel={handleBreedingTreeWheel}
                        onMouseDown={handleBreedingTreeMouseDown}
                        onMouseMove={handleBreedingTreeMouseMove}
                        onMouseLeave={handleBreedingTreeMouseLeave}
                        onMouseUp={handleBreedingTreeMouseUp}
                    >
                        <div className="files-tools-container">
                            <a ref={saveTreeLink}>
                                <IconButton className="file-tool" color="primary" onClick={handleDownloadTreeClick}>
                                    <CloudDownloadIcon titleAccess="Download data" />
                                </IconButton>
                            </a>
                            <IconButton className="file-tool" color="primary" onClick={handleUploadTreeClick}>
                                <PublishIcon titleAccess="Import data" />
                            </IconButton>
                        </div>
                        <div className="axie-search">
                            {/* <TextField
                                id="axie-search"
                                label="Search an axie"
                                placeholder="Example: 123456"
                                type="search"
                                variant="outlined"
                            /> */}
                        </div>
                        <svg
                            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                            className="breeding-tree-svg"
                        >
                            {axiesList.map((axie: any, index: number) => (
                                <g key={axie.id} transform={`translate(${400 * index}, 0)`}>
                                    <foreignObject width="400" height="400">
                                        <AxieProfileComponent
                                            axieGenes={axie.traits}
                                            axieId={axie.id}
                                            size="medium"
                                            breedCount={axie.breedCount}
                                            axieClass={axie.class}
                                        />
                                    </foreignObject>
                                </g>
                            ))}
                        </svg>
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
            </Box>
            <Backdrop className="spinner-backdrop" open={isAppLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogComponent
                title="Are you sure?"
                description="If you delete this tree, its data will be lost."
                isOpen={isDeleteModalOpen}
                acceptButtontitle="Delete"
                closeButtontitle="Cancel"
                handleAccept={handleAcceptDeleteModal}
                handleClose={handleDeleteModalClose}
            />
            <SnackbarComponent
                message={snackBarMessage}
                isTriggered={isSnackbarOpen}
                handleClose={handleSnackbarClose}
            ></SnackbarComponent>
        </div>
    );
};

export default BreedingTree;
