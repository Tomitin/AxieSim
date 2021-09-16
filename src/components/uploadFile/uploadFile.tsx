import { IconButton, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import './uploadFile.css';

interface UploadFileComponentProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFileComponent: React.FunctionComponent<UploadFileComponentProps> = (props: UploadFileComponentProps) => {
    const label = React.useRef<HTMLLabelElement>(null);

    const onButtonClick = () => {
        if (label.current) {
            label.current.click();
        }
    };

    return (
        <>
            <InputLabel ref={label} htmlFor="file-upload">
                <IconButton className="upload-button" color="primary" onClick={onButtonClick}>
                    <PublishIcon titleAccess="Import data" />
                </IconButton>
            </InputLabel>
            <Input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event)}
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
            />
        </>
    );
};

export default UploadFileComponent;
