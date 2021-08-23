import React from 'react';
import SnackbarComponent from '../snackbar/snackbar';
import ClipboardComponent from '../clipboard/clipboard';
import { useTranslation } from 'react-i18next';

interface ClipboardSnackbarComponentProps {
    textToCopy: string;
    messageSuccess?: string;
}

const ClipboardSnackbarComponent: React.FunctionComponent<ClipboardSnackbarComponentProps> = (
    props: ClipboardSnackbarComponentProps,
) => {
    const { t } = useTranslation();
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const handleSnackbarOpen = () => {
        setIsSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <div>
            <ClipboardComponent textToCopy={props.textToCopy} handleClick={handleSnackbarOpen}></ClipboardComponent>
            <SnackbarComponent
                message={props.messageSuccess ? props.messageSuccess : t('components.clipboardSnackbar.copy')}
                isTriggered={isSnackbarOpen}
                handleClose={handleSnackbarClose}
            />
        </div>
    );
};

export default ClipboardSnackbarComponent;
