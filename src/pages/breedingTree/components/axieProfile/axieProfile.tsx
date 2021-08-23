import React from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core';
import './axieProfile.css';
import { memo } from 'react';

type AxieType = 'beast' | 'plant' | 'bird' | 'aquatic' | 'reptile' | 'bug' | 'mech' | 'dawn' | 'dusk';
type GeneType = 'ears' | 'eyes' | 'back' | 'mouth' | 'horn' | 'tail';

interface GenesInformation {
    partId: string;
    class: AxieType;
    specialGenes?: boolean;
    type: GeneType;
    name: string;
}

interface Genes {
    d: GenesInformation;
    r1: GenesInformation;
    r2: GenesInformation;
    mystic?: boolean;
}

interface AxieGenes {
    cls: AxieType;
    region: string;
    color: Genes;
    pattern: Genes;
    eyes: Genes;
    ears: Genes;
    back: Genes;
    mouth: Genes;
    horn: Genes;
    tail: Genes;
}

interface AxieProfileComponentProps {
    axieGenes: AxieGenes;
    axieId: string;
    breedCount: number;
    axieClass?: AxieType;
    size: 'small' | 'medium' | 'large';
}

const AxieProfileComponent: React.FunctionComponent<AxieProfileComponentProps> = (props: AxieProfileComponentProps) => {
    /** This function should not exist, good approach is to iterate over all axie parts and do a loop once */
    const getClassTextByAxieClass = (axieClass: AxieType) => {
        switch (axieClass) {
            case 'aquatic':
                return 'aquatic-text';
            case 'beast':
                return 'beast-text';
            case 'plant':
                return 'plant-text';
            case 'reptile':
                return 'reptile-text';
            case 'bird':
                return 'bird-text';
            case 'bug':
                return 'bug-text';
            default:
                return '';
        }
    };

    return (
        <Box className="axie-profile-component">
            {console.count()}
            <Card className="axie-profile-card size-medium">
                <Box className="axie-profile-content-container">
                    <CardMedia
                        component="img"
                        draggable={false}
                        alt={props.axieClass ? props.axieClass : 'axie image'}
                        height="60"
                        image={`https://storage.googleapis.com/assets.axieinfinity.com/axies/${props.axieId}/axie/axie-full-transparent.png`}
                        title={props.axieClass ? props.axieClass : 'axie image'}
                    />
                    <CardContent className="axie-profile-content">
                        <Box className="axie-info-container">
                            <Typography
                                variant="h6"
                                component="a"
                                href={`https://marketplace.axieinfinity.com/axie/${props.axieId}`}
                                target="_blank"
                            >
                                #{props.axieId}
                            </Typography>
                            <Typography variant="h6">Breeds: {props.breedCount}/7</Typography>
                        </Box>
                        <Box className="genes-row">
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
                        </Box>
                    </CardContent>
                </Box>
                <CardActions className="axie-profile-actions-container">
                    <Button size="small" color="primary">
                        Check breedability
                    </Button>
                    <Button size="small" color="primary">
                        Update axie
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default memo(AxieProfileComponent);
