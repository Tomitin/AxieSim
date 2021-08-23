import {
    Box,
    Button,
    Collapse,
    IconButton,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import React from 'react';
import ScholarsTrackerLayout from '../../../layouts/scholarsTrackerLayout/scholarsTrackerLayout';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ClipboardTextComponent from '../../../components/clipboardText/clipboardText';
import './scholarsPayments.css';
import CoinAmountComponent from '../../../components/coinAmount/coinAmount';
import SnackbarComponent from '../../../components/snackbar/snackbar';
import { useTranslation } from 'react-i18next';

function createData(name: string, paymentAmount: number, paymentAccount: string) {
    return {
        name,
        paymentAmount,
        paymentAccount,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

interface CollapsibleRowProps {
    row: ReturnType<typeof createData>;
}

const CollapsibleRowComponent: React.FunctionComponent<CollapsibleRowProps> = (props: CollapsibleRowProps) => {
    const { t } = useTranslation();
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [snackBarMessage, setSnackbarMessage] = React.useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const handleSnackbarOpen = (message: string) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    // TODO: CHECK THAT SNACKBAR COMPONENT IS CALLED MANY TIMES BECAUSE IT'S INSIDE MULTIPLE COMPONENTS AND NOT IN THE PAGE ITSELF

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.paymentAmount}</TableCell>
                <TableCell>
                    <ClipboardTextComponent textToCopy={row.paymentAccount}></ClipboardTextComponent>
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() =>
                            handleSnackbarOpen(
                                t('pages.scholarsTracker.scholarsPayments.scholarPaid', { scholarName: row.name }),
                            )
                        }
                        variant="contained"
                        color="primary"
                    >
                        {t('pages.scholarsTracker.scholarsPayments.payScholar')}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h5" gutterBottom component="div">
                                {t('pages.scholarsTracker.scholarsPayments.details')}
                            </Typography>
                            <Box className="collapse-row-container">
                                <Box className="collapse-data-container">
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarsPayments.roninAccount')}</strong>
                                    </Typography>
                                    <ClipboardTextComponent textToCopy="ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd" />
                                </Box>
                                <Box className="collapse-data-container">
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarsPayments.holdings')}</strong>
                                    </Typography>
                                    <CoinAmountComponent coinType="SLP" amount="4500"></CoinAmountComponent>
                                </Box>
                            </Box>
                            <Box className="collapse-row-container">
                                <Box className="collapse-data-container">
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarsPayments.paymentDate')}</strong>
                                    </Typography>
                                    <Typography>3/8/2021 </Typography>
                                </Box>
                                <Box className="collapse-data-container">
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarsPayments.averageSlp')}</strong>
                                    </Typography>
                                    <Typography>
                                        {t('pages.scholarsTracker.scholarsPayments.slpPerDay', { slp: '150' })}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="collapse-row-container">
                                <Box className="collapse-data-container">
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarsPayments.contractMade')}</strong>
                                    </Typography>
                                    <Typography align="center">
                                        {t('pages.scholarsTracker.scholarsPayments.contractAgreed', {
                                            managerShare: '75',
                                            scholarShare: '25',
                                        })}
                                    </Typography>
                                    <LinearProgress
                                        className="percentage-bar-container"
                                        value={75}
                                        variant="determinate"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <SnackbarComponent
                message={snackBarMessage}
                isTriggered={isSnackbarOpen}
                handleClose={handleSnackbarClose}
            ></SnackbarComponent>
        </React.Fragment>
    );
};

const ScholarsPayments: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const rows = [
        createData('Ruben', 159, 'ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd'),
        createData('Bryan', 237, 'ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd'),
        createData('Eclair', 262, 'ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd'),
        createData('Chuck', 305, 'ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd'),
    ];

    return (
        <div className="scholars-payments">
            <ScholarsTrackerLayout title={t('pages.scholarsTracker.scholarsPayments.title')}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <caption>{t('pages.scholarsTracker.scholarsPayments.paymentWarning')}</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>{t('pages.scholarsTracker.scholarsPayments.scholarName')} </TableCell>
                                <TableCell>{t('pages.scholarsTracker.scholarsPayments.payment')}</TableCell>
                                <TableCell>{t('pages.scholarsTracker.scholarsPayments.paymentAccount')}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <CollapsibleRowComponent key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ScholarsTrackerLayout>
        </div>
    );
};

export default ScholarsPayments;
