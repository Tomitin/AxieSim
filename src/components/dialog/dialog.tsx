import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface DialogComponentProps {
    isOpen: boolean;
    title: string;
    description?: string;
    acceptButtontitle?: string;
    closeButtontitle?: string;
    fullWidth?: boolean;
    children?: ReactNode;
    maxWidth?: false | 'md' | 'xs' | 'sm' | 'lg' | 'xl';
    handleClose?: () => void;
    handleAccept?: () => void;
}

const DialogComponent: React.FunctionComponent<DialogComponentProps> = (props: DialogComponentProps) => {
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={!!props.fullWidth}
            maxWidth={props.maxWidth}
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {props.description || (
                    <DialogContentText id="alert-dialog-description">{props.description}</DialogContentText>
                )}
                {props.children}
            </DialogContent>
            {(!!props.handleClose || !!props.handleAccept) && (
                <DialogActions>
                    {props.handleClose && props.closeButtontitle && (
                        <Button onClick={props.handleClose} color="primary">
                            {props.closeButtontitle}
                        </Button>
                    )}

                    {props.handleAccept && props.acceptButtontitle && (
                        <Button onClick={props.handleAccept} variant="contained" color="primary" autoFocus>
                            {props.acceptButtontitle}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default DialogComponent;
