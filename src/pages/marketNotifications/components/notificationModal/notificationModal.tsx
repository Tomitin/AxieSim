import React, { ReactNode, SyntheticEvent, useEffect } from 'react';
import _ from 'lodash';
import { AxieData, AxieType } from '../../../../models/axie';
import DialogComponent from '../../../../components/dialog/dialog';
import { Checkbox, FormControl, TextField } from '@material-ui/core';
import Slider from '@mui/material/Slider';
import { Autocomplete, Button } from '@mui/material';
import { AXIE_CLASSES, AXIE_PARTS, AXIE_PARTS_CLASSES, GENES_TYPES } from '../../../../core/constants/constants';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './notificationModal.css';
import { capitalizeString } from '../../../../utils/utils';
import { personalApi } from '../../../../core/axios.instance';
import SnackbarComponent from '../../../../components/snackbar/snackbar';

interface NotificationModalComponentProps {
    axie: AxieData;
    title: string;
    isOpen: boolean;
    buttonTitle: string;
    onConfirmButtonClick: (
        id: number | string,
        genes: any,
        breedCount: number[],
        pureness: number,
        maxPrice: number,
        axieClass: AxieType,
        speed: number[],
    ) => void;
    onCloseClick: () => void;
    children?: ReactNode;
}

const breedCountMarks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 7,
        label: '7',
    },
];

const purenessMarks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 6,
        label: '6',
    },
];

const speedMarks = [
    {
        value: 27,
        label: '27',
    },
    {
        value: 61,
        label: '61',
    },
];

const NotificationModalComponent: React.FunctionComponent<NotificationModalComponentProps> = (
    props: NotificationModalComponentProps,
) => {
    const [axieCards, setAxieCards] = React.useState<any>();
    const [formState, setFormState] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [breedCount, setBreedCount] = React.useState<number[]>(
        props.axie.breedCount ? props.axie.breedCount : [0, 7],
    );
    const [speed, setSpeed] = React.useState<number[]>(props.axie.speed ? props.axie.speed : [27, 61]);
    const [pureness, setPureness] = React.useState<any>(props.axie.pureness ? props.axie.pureness : 0);
    const [maxAxiePrice, setMaxAxiePrice] = React.useState<any>(props.axie.maxAxiePrice ? props.axie.maxAxiePrice : 0);
    const [axieClasses, setAxieClasses] = React.useState<any>([]);
    const [classesInput, setClassesInput] = React.useState<any>('');
    const [axieSalesList, setAxieSalesList] = React.useState([]);

    useEffect(() => {
        const formData: any = {};
        AXIE_PARTS.forEach((part, partIndex) => {
            GENES_TYPES.forEach((gene, geneIndex) => {
                const formattedGene = props.axie.genes[partIndex][geneIndex].map((gene: string) => {
                    return {
                        label: capitalizeString(gene.replace(`${part}-`, '')),
                        id: gene,
                    };
                });
                formData[part + '-' + gene] = {
                    value: formattedGene,
                    inputValue: '',
                };
            });
        });

        setSpeed(props.axie.speed ? props.axie.speed : [27, 61]);
        setMaxAxiePrice(props.axie.maxAxiePrice ? props.axie.maxAxiePrice : 0);
        setBreedCount(props.axie.breedCount ? props.axie.breedCount : [0, 7]);
        setPureness(props.axie.pureness);
        setMaxAxiePrice(props.axie.maxAxiePrice);
        setAxieClasses([capitalizeString(props.axie.axieClass)]);
        setFormState(formData);
    }, [props.axie]);

    useEffect(() => {
        if (!axieCards) {
            setIsLoading(true);
            fetch('cards.json')
                .then((response) => response.json())
                .then((data) => {
                    const sortedData = data.sort((cardA: any, cardB: any) => {
                        if (cardA.name < cardB.name) {
                            return -1;
                        }
                        if (cardA.name > cardB.name) {
                            return 1;
                        }
                        return 0;
                    });
                    setAxieCards(_.groupBy(sortedData, 'type'));
                });
        } else {
            setIsLoading(false);
        }
    }, [axieCards]);

    const onConfirmButtonClick = () => {
        setIsLoading(true);
        props.onConfirmButtonClick(
            props.axie.id,
            getformattedGenes(true),
            breedCount,
            pureness,
            maxAxiePrice,
            axieClasses,
            speed,
        );
        setIsLoading(false);
    };

    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        newValue: unknown,
        reason: string,
        inputId: string,
    ) => {
        if (reason === 'selectOption' || reason === 'removeOption') {
            setFormState({
                ...formState,
                [inputId]: {
                    ...formState[inputId],
                    value: newValue,
                },
            });
        } else if (reason === 'clear') {
            setFormState({
                ...formState,
                [inputId]: {
                    ...formState[inputId],
                    value: [],
                },
            });
        }
    };

    const handleInputChange = (event: SyntheticEvent<Element, Event>, newValue: unknown, inputId: string) => {
        setFormState({
            ...formState,
            [inputId]: {
                ...formState[inputId],
                inputValue: newValue,
            },
        });
    };

    const getformattedGenes = (withWildcard = false): any[] => {
        const genes: any[] = [];
        AXIE_PARTS.forEach((part) => {
            const partRow = GENES_TYPES.reduce((accumulator: any, geneType: string) => {
                const geneList = formState[part + '-' + geneType].value.map((value: any) => value.id);
                if (geneList.length === 0 && withWildcard) {
                    return [...accumulator, [`${part}-wildcard`]];
                } else {
                    return [...accumulator, geneList];
                }
            }, []);
            genes.push(partRow);
        });
        return genes;
    };

    const searchAxieSales = async () => {
        setIsLoading(true);

        let formattedClasses = [];
        const genes = getformattedGenes();
        if (Array.isArray(axieClasses) && axieClasses.length > 0) {
            formattedClasses = axieClasses.map((axieClass) => axieClass.toLowerCase());
        }

        const formattedGenes = AXIE_PARTS.reduce((accumulator, axiePart, index) => {
            const dGene = genes[index][0];
            const r1Gene = genes[index][1];
            const r2Gene = genes[index][2];
            return {
                ...accumulator,
                [axiePart]: {
                    d: dGene && dGene.includes(axiePart + '-wildcard') ? null : dGene,
                    r1: r1Gene && r1Gene.includes(axiePart + '-wildcard') ? null : r1Gene,
                    r2: r2Gene && r2Gene.includes(axiePart + '-wildcard') ? null : r2Gene,
                },
            };
        }, {});
        personalApi
            .post('/sales', {
                genes: { ...formattedGenes },
                breedCount: breedCount,
                class: formattedClasses,
                limit: 40,
            })
            .then((response: any) => {
                console.log(response.data.data);
                console.log('hola');
                setAxieSalesList(response.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setAxieSalesList([]);
                setIsLoading(false);
            });
    };

    const getAxieCardsOptions = (axiePart: string) => {
        const axiePartsArray = axieCards[axiePart].map((axieCard: any) => {
            return {
                label: axieCard.name,
                id: axieCard.partId,
            };
        });
        return axiePartsArray;
    };

    const copyGenes = (originGenes: 'd' | 'r1' | 'r2', targetGenes: 'd' | 'r1' | 'r2') => {
        const modifiedState = AXIE_PARTS.reduce((accumulator, part) => {
            const originPartId = `${part}-${originGenes}`;
            const targetPartId = `${part}-${targetGenes}`;
            return {
                ...accumulator,
                [targetPartId]: {
                    inputValue: '',
                    value: formState[originPartId].value,
                },
            };
        }, {});

        setFormState({
            ...formState,
            ...modifiedState,
        });
    };

    const getEyesEarsOptions = (axiePart: string) => {
        const axiePartsArray = AXIE_PARTS_CLASSES.map((axieClass) => {
            return {
                label: axiePart + ' ' + axieClass,
                id: axiePart + '-' + axieClass,
            };
        });

        return axiePartsArray;
    };

    const getGenesOptions = (axiePart: string) => {
        if (axiePart === 'eyes' || axiePart === 'ears') {
            return getEyesEarsOptions(axiePart);
        }
        return getAxieCardsOptions(axiePart);
    };

    const handleBreedCountChange = (event: Event, newValue: number[] | number) => {
        if (Array.isArray(newValue)) {
            setBreedCount(newValue);
        }
    };
    const handleSpeedChange = (event: Event, newValue: number[] | number) => {
        if (Array.isArray(newValue)) {
            setSpeed(newValue);
        }
    };

    const handlePurenessChange = (event: Event, newValue: number[] | number) => {
        setPureness(newValue);
    };

    const getSaleDate = (dateTimestamp: string) => {
        const date = dateTimestamp.split('T')[0];
        const splittedDate = date.split('-');

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    };

    const handleMaxAxiePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAxiePrice(event.target.value);
    };

    const handleClassesChange = (event: React.SyntheticEvent<Element, Event>, newValue: unknown, reason: string) => {
        setAxieClasses(newValue);
    };

    const handleClassesInputChange = (event: React.SyntheticEvent<Element, Event>, newValue: unknown) => {
        setClassesInput(newValue);
    };

    return (
        <div>
            <DialogComponent
                handleClose={props.onCloseClick}
                fullWidth={true}
                maxWidth={'xl'}
                isOpen={props.isOpen}
                title={props.title}
            >
                <div className="notification-modal">
                    {console.log(axieSalesList)}
                    {console.log(axieSalesList.length > 0)}
                    {!isLoading && (
                        <div>
                            <div className="genes-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Dominant</th>
                                            <th>
                                                Recessive 1{' '}
                                                <a href="#" onClick={() => copyGenes('d', 'r1')}>
                                                    Copy D
                                                </a>
                                            </th>
                                            <th>
                                                Recessive 2{' '}
                                                <a href="#" onClick={() => copyGenes('r1', 'r2')}>
                                                    Copy R1
                                                </a>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AXIE_PARTS.map((part) => (
                                            <tr key={part}>
                                                <th>{part}</th>
                                                {GENES_TYPES.map((geneType) => (
                                                    <td key={geneType}>
                                                        <FormControl className="form-control">
                                                            <Autocomplete
                                                                className="genes-select"
                                                                multiple
                                                                disableCloseOnSelect
                                                                limitTags={1}
                                                                id={part + '-' + geneType}
                                                                value={formState[part + '-' + geneType].value}
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option.id === value.id
                                                                }
                                                                onChange={(event, newValue, reason) =>
                                                                    handleChange(
                                                                        event,
                                                                        newValue,
                                                                        reason,
                                                                        part + '-' + geneType,
                                                                    )
                                                                }
                                                                inputValue={formState[part + '-' + geneType].inputValue}
                                                                onInputChange={(event, newValue) =>
                                                                    handleInputChange(
                                                                        event,
                                                                        newValue,
                                                                        part + '-' + geneType,
                                                                    )
                                                                }
                                                                options={getGenesOptions(part)}
                                                                getOptionLabel={(option: any) => option.label}
                                                                groupBy={(option: any) => option.label[0]}
                                                                renderInput={(params: any) => (
                                                                    <TextField {...params} placeholder="Search gene" />
                                                                )}
                                                                renderOption={(props, option, { selected }) => (
                                                                    <li {...props}>
                                                                        <Checkbox
                                                                            icon={
                                                                                <CheckBoxOutlineBlankIcon fontSize="small" />
                                                                            }
                                                                            checkedIcon={
                                                                                <CheckBoxIcon fontSize="small" />
                                                                            }
                                                                            style={{ marginRight: 8 }}
                                                                            checked={selected}
                                                                        ></Checkbox>
                                                                        {option.label}
                                                                    </li>
                                                                )}
                                                            />
                                                        </FormControl>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="stats-container">
                                <div className="slider-container">
                                    <Autocomplete
                                        multiple
                                        disableCloseOnSelect
                                        limitTags={1}
                                        value={axieClasses}
                                        onChange={handleClassesChange}
                                        inputValue={classesInput}
                                        onInputChange={handleClassesInputChange}
                                        options={AXIE_CLASSES}
                                        renderInput={(params: any) => (
                                            <TextField {...params} placeholder="Axie class" />
                                        )}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props}>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                ></Checkbox>
                                                {option}
                                            </li>
                                        )}
                                    />
                                </div>
                                <div className="slider-container">
                                    Breed count:
                                    <Slider
                                        marks={breedCountMarks}
                                        value={breedCount}
                                        onChange={handleBreedCountChange}
                                        valueLabelDisplay="auto"
                                        max={7}
                                    />
                                </div>
                                <div className="slider-container">
                                    Pureness:
                                    <Slider
                                        marks={purenessMarks}
                                        value={pureness}
                                        onChange={handlePurenessChange}
                                        valueLabelDisplay="auto"
                                        max={6}
                                    />
                                </div>
                                <div className="slider-container">
                                    Speed ⚡:
                                    <Slider
                                        marks={speedMarks}
                                        value={speed}
                                        onChange={handleSpeedChange}
                                        valueLabelDisplay="auto"
                                        min={27}
                                        max={61}
                                    />
                                </div>
                                <div className="slider-container">
                                    Max axie price(ETH):
                                    <input
                                        type="number"
                                        onChange={handleMaxAxiePriceChange}
                                        value={maxAxiePrice}
                                        min="0"
                                        onKeyPress={(event) => {
                                            if (event.key === '+' || event.key === '-') {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="actions-container">
                        <Button disabled={isLoading} onClick={() => searchAxieSales()} variant="contained">
                            Search sales
                        </Button>
                        <Button disabled={isLoading} onClick={() => onConfirmButtonClick()} variant="contained">
                            {props.buttonTitle}
                        </Button>
                    </div>
                    <div className="sales-container">
                        <div className="sales-list-container">
                            {console.log(axieSalesList)}
                            {console.log(axieSalesList.length > 0)}
                            {!!axieSalesList &&
                                axieSalesList.length > 0 &&
                                axieSalesList.map((axieSale: any, index) => {
                                    return (
                                        <div key={index} className="axie-sale">
                                            <div>
                                                <a
                                                    rel="noreferrer"
                                                    target={'_blank'}
                                                    href={`https://marketplace.axieinfinity.com/axie/${axieSale.axie_id}`}
                                                >
                                                    Axie #{axieSale.axie_id}
                                                </a>
                                            </div>
                                            <div>Sell price: {axieSale.price_in_eth.toFixed(3)} ETH</div>
                                            <div>Sell date: {getSaleDate(axieSale.timestamp)}</div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </DialogComponent>
        </div>
    );
};

export default NotificationModalComponent;
