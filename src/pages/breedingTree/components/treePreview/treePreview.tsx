import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Box, IconButton } from '@material-ui/core';
import './treePreview.css';

interface TreePreviewComponentProps {
    handleDeleteTreeClick: () => void;
    handleClick: () => void;
    title: string;
    isSelected: boolean;
}

const TreePreviewComponent: React.FunctionComponent<TreePreviewComponentProps> = (props: TreePreviewComponentProps) => {
    const handleClick = () => {
        props.handleClick();
    };

    const handleDeleteTreeClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        props.handleDeleteTreeClick();
    };

    return (
        <Box onClick={handleClick} className={`tree-preview ${props.isSelected ? 'tree-preview-active' : ''}`}>
            <Box className="delete-icon-container">
                <IconButton className="delete-icon-button" size="small" onClick={handleDeleteTreeClick}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box className="tree-title-container">{props.title}</Box>
        </Box>
    );
};

export default TreePreviewComponent;
