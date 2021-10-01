import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './axieProfile.css';
import { AxieType } from '../../../../models/axie';
interface AxieProfileComponentProps {
    // axieGenes: AxieGenes;
    axieId: string;
    breedCount?: number;
    axieClass?: AxieType;
    size: 'small' | 'medium' | 'large';
    axieImageSrc: string;
    onUpdateAxieClick?: () => void;
    onDeleteAxieClick?: () => void;
    onSearchParentsClick?: (axieId: string, motherId: string, fatherId: string) => void;
}

const AxieProfileComponent: React.FunctionComponent<AxieProfileComponentProps> = (props: AxieProfileComponentProps) => {
    return (
        <div className="axie-profile-component">
            <Card className="axie-profile-card size-medium">
                <div className="axie-profile-content-container">
                    {!!props.onDeleteAxieClick && (
                        <div className="delete-icon-container">
                            <IconButton className="delete-icon-button" size="medium" onClick={props.onDeleteAxieClick}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    )}
                    <CardMedia
                        component="img"
                        draggable={false}
                        alt={props.axieClass ? props.axieClass : 'axie image'}
                        height="90"
                        image={props.axieImageSrc}
                        title={props.axieClass ? props.axieClass : 'axie image'}
                    />
                    <CardContent className="axie-profile-content">
                        <div className="axie-info-container">
                            <Typography
                                className="axie-id-link"
                                variant="h4"
                                align="center"
                                component="a"
                                href={`https://marketplace.axieinfinity.com/axie/${props.axieId}`}
                                target="_blank"
                            >
                                #{props.axieId}
                            </Typography>
                        </div>
                    </CardContent>
                </div>
                <CardActions className="axie-profile-actions-container">
                    {props.onSearchParentsClick && (
                        <Button
                            className="axie-profile-action-button"
                            disableRipple={true}
                            size="small"
                            color="primary"
                            fullWidth={true}
                            // onClick={props.onSearchParentsClick}
                        >
                            <Typography variant="h5">Search parents</Typography>
                        </Button>
                    )}
                    {props.onUpdateAxieClick && (
                        <Button
                            className="axie-profile-action-button"
                            disableRipple={true}
                            onClick={props.onUpdateAxieClick}
                            size="large"
                            fullWidth={true}
                            color="primary"
                        >
                            <Typography variant="h5">Search children</Typography>
                        </Button>
                    )}
                </CardActions>
            </Card>
        </div>
    );
};

export default AxieProfileComponent;
