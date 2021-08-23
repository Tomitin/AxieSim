import { IconButton } from '@material-ui/core';
import React from 'react';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { useTranslation } from 'react-i18next';

interface ClipboardComponentProps {
    textToCopy: string;
    handleClick?: () => void;
}

const ClipboardComponent: React.FunctionComponent<ClipboardComponentProps> = (props: ClipboardComponentProps) => {
    const { t } = useTranslation();

    const handleClick = () => {
        if (props.handleClick) {
            props.handleClick();
        }
        navigator.clipboard.writeText(props.textToCopy);
    };

    return (
        <IconButton size="small" onClick={handleClick}>
            <FileCopyOutlinedIcon color="primary" titleAccess={t('components.clipboard.copy')} />
        </IconButton>
    );
};

export default ClipboardComponent;
