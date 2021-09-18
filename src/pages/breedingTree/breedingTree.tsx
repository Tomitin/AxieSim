import { Box, Divider, Typography, TextField, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import './breedingTree.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewTreeForm,
    deleteTree,
    submitNewTreeForm,
    updateTreeSelected,
} from '../../core/redux/breedingTree/actions';
import {
    getIsAppLoading,
    getIsNewTreeSelected,
    getSelectedTreeId,
    getTreeDisplayData,
    getTreeList,
} from '../../core/redux/breedingTree/selectors';
import AddIcon from '@material-ui/icons/Add';
import DialogComponent from '../../components/dialog/dialog';
import SnackbarComponent from '../../components/snackbar/snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TreePreviewComponent from './components/treePreview/treePreview';
import TreeComponent from './containers/tree/tree';
import ClipboardTextComponent from '../../components/clipboardText/clipboardText';
import { TreeStructure } from '../../models/breedingTree';
import { TreeState } from '../../models/state';

const BreedingTree: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const isNewTreeSelected: boolean = useSelector((state) => getIsNewTreeSelected(state));
    const treeDisplayData: TreeStructure = useSelector((state) => getTreeDisplayData(state));
    const isAppLoading: boolean = useSelector((state) => getIsAppLoading(state));
    const treeList: TreeState[] = useSelector((state) => getTreeList(state));
    const selectedTreeId: string = useSelector((state) => getSelectedTreeId(state));
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState<boolean>(false);
    const [searchTreesForm, setSearchTreesForm] = React.useState<string>('');
    const [filteredTreeList, setFilteredTreeList] = React.useState<TreeState[]>([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [isDonationsModalOpen, setIsDonationsModalOpen] = React.useState<boolean>(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = React.useState<boolean>(false);
    const [treeIdToDelete, setTreeIdToDelete] = React.useState<string>('');
    const [snackBarMessage, setSnackbarMessage] = React.useState<string>('');
    const [newTreeForm, setNewTreeForm] = React.useState({
        treeName: '',
        axieOne: '',
    });

    useEffect(() => {
        const filteredTrees = treeList.filter((tree: TreeState) => tree.title.toLowerCase().includes(searchTreesForm));

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

    /* Donations modal */

    const handleDonationsClick = () => {
        setIsDonationsModalOpen(true);
    };

    const handleDonationsClose = () => {
        setIsDonationsModalOpen(false);
    };

    /* Support modal */

    const handleSupportClick = () => {
        setIsSupportModalOpen(true);
    };

    const handleSupportClose = () => {
        setIsSupportModalOpen(false);
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
                <div className="support-container">
                    <Box className="support-button-container">
                        <Button
                            onClick={handleDonationsClick}
                            className="donation-button"
                            variant="text"
                            color="primary"
                        >
                            Donations
                        </Button>
                    </Box>
                    <Box className="support-button-container">
                        <Button onClick={handleSupportClick} className="support-button" variant="text" color="primary">
                            Support
                        </Button>
                    </Box>
                </div>
            </Box>
            <Box className="main-content">
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
                {!isAppLoading && !isNewTreeSelected && (
                    <TreeComponent selectedTreeId={selectedTreeId} treeStructure={treeDisplayData} />
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
            <DialogComponent
                title="Contact me"
                description="Hey, if you have feature requests, if you find bugs or anything related to this page, feel free to contact me via:"
                isOpen={isSupportModalOpen}
                closeButtontitle="Close"
                handleClose={handleSupportClose}
            >
                <Box marginTop="8px">
                    <strong>Discord:</strong> Tomitin#7106
                </Box>
                <div>
                    <strong>Email:</strong> tomssaezm@gmail.com
                </div>
            </DialogComponent>
            <DialogComponent
                title="Thank you for your support!"
                isOpen={isDonationsModalOpen}
                closeButtontitle="Close"
                handleClose={handleDonationsClose}
            >
                <div style={{ marginBottom: '16px' }}>
                    <Typography variant="subtitle2">
                        This idea happened thanks to the community and I surely hope this tool is useful for you :).
                        Improvements to this system will happen regularly so if you want to suggest something feel free
                        to dm me by discord: Tomitin#7106.
                    </Typography>
                </div>
                <div>
                    Ethereum:
                    <div className="donation-box-container">
                        <ClipboardTextComponent
                            fullWidth={true}
                            textToCopy="0x1491e7f79ee584D4a668E13697b6525C2F60DaE8"
                        >
                            0x1491e7f79ee584D4a668E13697b6525C2F60DaE8
                        </ClipboardTextComponent>
                    </div>
                </div>
                <div>
                    Axs/slp/axies:
                    <div className="donation-box-container">
                        <ClipboardTextComponent
                            fullWidth={true}
                            textToCopy="ronin:6a0c1869aa161bc0022baac7dc2335019b7805a7"
                        >
                            ronin:6a0c1869aa161bc0022baac7dc2335019b7805a7
                        </ClipboardTextComponent>
                    </div>
                </div>
            </DialogComponent>
            <SnackbarComponent
                message={snackBarMessage}
                isTriggered={isSnackbarOpen}
                handleClose={handleSnackbarClose}
            ></SnackbarComponent>
        </div>
    );
};

export default BreedingTree;
