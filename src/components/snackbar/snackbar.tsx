import { IconButton, Snackbar } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface SnackbarComponentProps {
    isTriggered: boolean;
    message: string;
    handleClose: () => void;
}

const SnackbarComponent: React.FunctionComponent<SnackbarComponentProps> = (props: SnackbarComponentProps) => {
    const handleSnackbarClose = (_event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.handleClose();
    };

    return (
        <Snackbar
            open={props.isTriggered}
            autoHideDuration={2500}
            onClose={handleSnackbarClose}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
            message={props.message}
        ></Snackbar>
    );
};

export default SnackbarComponent;
