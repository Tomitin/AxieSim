import { Box } from '@material-ui/core';
import React, { ReactNode } from 'react';
import ClipboardSnackbarComponent from '../clipboardSnackbar/clipboardSnackbar';
import './clipboardText.css';

interface ClipboardTextComponentProps {
    textToCopy: string;
    messageSuccess?: string;
    fullWidth?: boolean;
    children?: ReactNode;
}

const ClipboardTextComponent: React.FunctionComponent<ClipboardTextComponentProps> = (
    props: ClipboardTextComponentProps,
) => {
    return (
        <Box
            className={`clipboard-text clipboard-text-container ${props.fullWidth && 'full-width'}`}
            display="flex"
            alignItems="center"
        >
            <Box className="text-container">{!!props.children ? props.children : props.textToCopy}</Box>
            <ClipboardSnackbarComponent textToCopy={props.textToCopy} messageSuccess={props.messageSuccess} />
        </Box>
    );
};

export default ClipboardTextComponent;
