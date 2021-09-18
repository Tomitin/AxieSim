import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import './axieProfile.css';
import { memo } from 'react';
import { AxieType } from '../../../../models/axie';
interface AxieProfileComponentProps {
    // axieGenes: AxieGenes;
    axieId: string;
    breedCount: number;
    axieClass?: AxieType;
    size: 'small' | 'medium' | 'large';
    onUpdateAxieClick: () => void;
}

const AxieProfileComponent: React.FunctionComponent<AxieProfileComponentProps> = (props: AxieProfileComponentProps) => {
    /** This function should not exist, good approach is to iterate over all axie parts and do a loop once */
    // const getClassTextByAxieClass = (axieClass: AxieType) => {
    //     switch (axieClass) {
    //         case 'aquatic':
    //             return 'aquatic-text';
    //         case 'beast':
    //             return 'beast-text';
    //         case 'plant':
    //             return 'plant-text';
    //         case 'reptile':
    //             return 'reptile-text';
    //         case 'bird':
    //             return 'bird-text';
    //         case 'bug':
    //             return 'bug-text';
    //         default:
    //             return '';
    //     }
    // };

    return (
        <div className="axie-profile-component">
            <Card className="axie-profile-card size-medium">
                <div className="axie-profile-content-container">
                    <CardMedia
                        component="img"
                        draggable={false}
                        alt={props.axieClass ? props.axieClass : 'axie image'}
                        height="60"
                        image={`https://storage.googleapis.com/assets.axieinfinity.com/axies/${props.axieId}/axie/axie-full-transparent.png`}
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
                        {/*<Box className="genes-row">
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.eyes.d.class)
                                    }
                                >
                                    {props.axieGenes.eyes.d.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.eyes.r1.class)
                                    }
                                >
                                    {props.axieGenes.eyes.r1.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.eyes.r2.class)
                                    }
                                >
                                    {props.axieGenes.eyes.r2.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="genes-row">
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.ears.d.class)
                                    }
                                >
                                    {props.axieGenes.ears.d.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.ears.r1.class)
                                    }
                                >
                                    {props.axieGenes.ears.r1.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.ears.r2.class)
                                    }
                                >
                                    {props.axieGenes.ears.r2.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="genes-row">
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.mouth.d.class)
                                    }
                                >
                                    {props.axieGenes.mouth.d.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.mouth.r1.class)
                                    }
                                >
                                    {props.axieGenes.mouth.r1.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.mouth.r2.class)
                                    }
                                >
                                    {props.axieGenes.mouth.r2.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="genes-row">
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.horn.d.class)
                                    }
                                >
                                    {props.axieGenes.horn.d.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.horn.r1.class)
                                    }
                                >
                                    {props.axieGenes.horn.r1.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.horn.r2.class)
                                    }
                                >
                                    {props.axieGenes.horn.r2.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="genes-row">
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.back.d.class)
                                    }
                                >
                                    {props.axieGenes.back.d.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.back.r1.class)
                                    }
                                >
                                    {props.axieGenes.back.r1.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.back.r2.class)
                                    }
                                >
                                    {props.axieGenes.back.r2.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="genes-row">
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.tail.d.class)
                                    }
                                >
                                    {props.axieGenes.tail.d.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.tail.r1.class)
                                    }
                                >
                                    {props.axieGenes.tail.r1.name}
                                </Typography>
                            </Box>
                            <Box className="genes-name-col">
                                <Typography
                                    className={
                                        'axie-class-text ' + getClassTextByAxieClass(props.axieGenes.tail.r2.class)
                                    }
                                >
                                    {props.axieGenes.tail.r2.name}
                                </Typography>
                            </Box>
                        </Box>*/}
                    </CardContent>
                </div>
                <CardActions className="axie-profile-actions-container">
                    <div>
                        <Button
                            className="axie-profile-action-button"
                            disableRipple={true}
                            size="small"
                            color="primary"
                            fullWidth={true}
                        >
                            <Typography variant="h5">Check breedability</Typography>
                        </Button>
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
                    </div>
                </CardActions>
            </Card>
        </div>
    );
};

export default memo(AxieProfileComponent);
