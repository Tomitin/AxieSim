import React, { ReactNode } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { AxieType } from '../../../../models/axie';
import CloseIcon from '@mui/icons-material/Close';
import './notificationCard.css';

interface NotificationCardComponentProps {
    // axieGenes: AxieGenes;
    breedCount?: number;
    axieClass: AxieType;
    icon: React.ReactNode;
    href?: string;
    buttonTitle: string;
    onButtonClick?: () => void;
    onDeleteClick?: () => void;
    onIconClick?: () => void;
    children?: ReactNode;
}

const NotificationCardComponent: React.FunctionComponent<NotificationCardComponentProps> = (
    props: NotificationCardComponentProps,
) => {
    return (
        <div className="notification-card">
            <div className={`card-color ${props.axieClass.toLowerCase()}-color`}>
                <div className="marketplace-icon">
                    {!!props.href && !props.onIconClick ? (
                        <IconButton target="_blank" href={props.href}>
                            {props.icon}
                        </IconButton>
                    ) : (
                        <IconButton onClick={props.onIconClick}>{props.icon}</IconButton>
                    )}
                </div>
                <div className="remove-icon">
                    <IconButton>
                        <CloseIcon onClick={props.onDeleteClick} />
                    </IconButton>
                </div>
                <div></div>
            </div>
            <div className="card-content">{props.children}</div>
            <div className="card-actions">
                <Button onClick={props.onButtonClick} fullWidth={true} variant="contained" color="primary">
                    {props.buttonTitle}
                </Button>
            </div>
        </div>
    );
};

export default NotificationCardComponent;
