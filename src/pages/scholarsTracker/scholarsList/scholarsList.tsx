import {
    Box,
    Button,
    IconButton,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Switch,
    FormControlLabel,
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScholarsTrackerLayout from '../../../layouts/scholarsTrackerLayout/scholarsTrackerLayout';
import DialogComponent from '../../../components/dialog/dialog';
import SnackbarComponent from '../../../components/snackbar/snackbar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import './scholarsList.css';
import AddScholarDialog from '../components/addScholarDialog/addScholarDialog';
import EditIcon from '@material-ui/icons/Edit';
import ClipboardTextComponent from '../../../components/clipboardText/clipboardText';
import CoinAmountComponent from '../../../components/coinAmount/coinAmount';

interface Data {
    id: string;
    name: string;
    performance: number;
    slpHeld: number;
    ronninAccount: string;
    paymentDate: Date;
    percentageAgreed: number;
}

function createData(
    id: string,
    name: string,
    performance: number,
    slpHeld: number,
    ronninAccount: string,
    paymentDate: Date,
    percentageAgreed: number,
): Data {
    return { id, name, performance, slpHeld, ronninAccount, percentageAgreed, paymentDate };
}

const rows = [
    createData('1', 'Ruben', 143, 650, 'ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd', new Date(), 70),
    createData('2', 'Carlos', 163, 754, 'ronin:7f7cdcb632d1641378086ce89ab4190b61677805', new Date(), 70),
    createData('3', 'Julian', 139, 853, 'ronin:7f7cdcb632d1641378086ce89ab4190b61677805', new Date(), 50),
    createData('6', 'Julian', 193, 3213, 'ronin:ae28687060ddf1cdeb0184906c7b0e536a86d3f6', new Date(), 50),
    createData('4', 'Xin zhao', 135, 4520, 'ronin:fdaa118b4c3ca2ea10bdc89becda775c081cb7d6', new Date(), 60),
    createData('5', 'Patrick', 403, 1795, 'ronin:a56a0aae7d6da05d62be9638918e65a18702764c', new Date(), 60),
];

/**** END OF MOCKUPS *****/

const ScholarsList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const DEFAULT_ROWS_PER_PAGE = 10;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [snackBarMessage, setSnackbarMessage] = React.useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
    const [IsAddScholarModalOpen, setIsAddScholarModalOpen] = React.useState(false);
    const [isShowInactiveScholarsChecked, setIsShowInactiveScholarsChecked] = React.useState(false);

    const handleInactiveScholarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsShowInactiveScholarsChecked(event.target.checked);
    };

    /* Snackbar */

    const handleSnackbarOpen = (message: string) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    /* Add scholar */

    const handleAddScholarClick = () => {
        setIsAddScholarModalOpen(true);
    };

    const handleAddScholarClose = () => {
        setIsAddScholarModalOpen(false);
    };

    const handleAddScholarAccept = () => {
        setIsAddScholarModalOpen(false);
        handleSnackbarOpen(t('pages.scholarsTracker.scholarsList.successAdd'));
    };

    /* Delete modal */

    const handleClickDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleAcceptDeleteModal = () => {
        setDeleteModalOpen(false);
        handleSnackbarOpen(t('pages.scholarsTracker.scholarsList.successDelete'));
    };

    /* Pagination */

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getPaginatedRows = (): Data[] => {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };
    /** End pagination */

    const handleSeeDetailsClick = (id: string) => {
        history.push('/scholars-tracker/scholars-list/' + id + '/details');
    };

    return (
        <div className="scholars-list">
            <ScholarsTrackerLayout title={t('pages.scholarsTracker.scholarsList.title')}>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Typography variant="h5">{rows.length} scholars listed</Typography>
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isShowInactiveScholarsChecked}
                                    onChange={handleInactiveScholarsChange}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label={t('pages.scholarsTracker.scholarsList.showInactiveScholars')}
                        />
                        <Button
                            onClick={handleAddScholarClick}
                            startIcon={<AddIcon />}
                            variant="contained"
                            color="primary"
                        >
                            {t('pages.scholarsTracker.scholarsList.addScholar')}
                        </Button>
                    </Box>
                </Box>
                <TableContainer>
                    <Table aria-label="Scholars table">
                        <TableHead>
                            <TableRow>
                                <TableCell key="name">{t('pages.scholarsTracker.scholarsList.scholarName')}</TableCell>
                                <TableCell key="ronninAccount" align="center">
                                    {t('pages.scholarsTracker.scholarsList.roninAccount')}
                                </TableCell>
                                <TableCell key="performance" align="right">
                                    {t('pages.scholarsTracker.scholarsList.averageSlp')}
                                </TableCell>
                                <TableCell key="slpHeld" align="right">
                                    {t('pages.scholarsTracker.scholarsList.holdings')}
                                </TableCell>
                                <TableCell key="paymentDate" align="right">
                                    {t('pages.scholarsTracker.scholarsList.nextClaim')}
                                </TableCell>
                                <TableCell key="percentageAgreed" align="right">
                                    {t('pages.scholarsTracker.scholarsList.percentageAgreed')}
                                </TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getPaginatedRows().map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        <ClipboardTextComponent textToCopy={row.ronninAccount}></ClipboardTextComponent>
                                    </TableCell>
                                    <TableCell align="center">
                                        {t('pages.scholarsTracker.scholarsList.slpPerDay', { slp: row.performance })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <CoinAmountComponent coinType="SLP" amount={row.slpHeld} />
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.paymentDate.getDate()}/{row.paymentDate.getMonth()}/
                                        {row.paymentDate.getFullYear()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography align="center">
                                            {row.percentageAgreed}/{100 - row.percentageAgreed}
                                        </Typography>
                                        <LinearProgress
                                            className="percentage-bar-container"
                                            value={row.percentageAgreed}
                                            variant="determinate"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleAddScholarClick()}>
                                            <EditIcon
                                                titleAccess={t('pages.scholarsTracker.scholarsList.editScholar')}
                                                color="primary"
                                            />
                                        </IconButton>
                                        <IconButton onClick={() => handleSeeDetailsClick(row.id)}>
                                            <AssignmentIcon
                                                titleAccess={t('pages.scholarsTracker.scholarsList.seeDetails')}
                                                color="primary"
                                            />
                                        </IconButton>
                                        <IconButton onClick={handleClickDeleteModal}>
                                            <DeleteIcon
                                                titleAccess={t('pages.scholarsTracker.scholarsList.removeScholarship')}
                                                color="secondary"
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[
                        DEFAULT_ROWS_PER_PAGE,
                        DEFAULT_ROWS_PER_PAGE * 2,
                        DEFAULT_ROWS_PER_PAGE * 5,
                        { value: -1, label: 'All' },
                    ]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <DialogComponent
                    title={t('pages.scholarsTracker.scholarsList.scholarDeleteDialog.title')}
                    description={t('pages.scholarsTracker.scholarsList.scholarDeleteDialog.description')}
                    isOpen={isDeleteModalOpen}
                    acceptButtontitle={t('pages.scholarsTracker.scholarsList.scholarDeleteDialog.confirm')}
                    closeButtontitle={t('pages.scholarsTracker.scholarsList.scholarDeleteDialog.cancel')}
                    handleAccept={handleAcceptDeleteModal}
                    handleClose={handleDeleteModalClose}
                />
                <AddScholarDialog
                    isAddScholarModalOpen={IsAddScholarModalOpen}
                    handleAddScholarClose={handleAddScholarClose}
                    handleAddScholarAccept={handleAddScholarAccept}
                />
                <SnackbarComponent
                    message={snackBarMessage}
                    isTriggered={isSnackbarOpen}
                    handleClose={handleSnackbarClose}
                ></SnackbarComponent>
            </ScholarsTrackerLayout>
        </div>
    );
};

export default ScholarsList;
