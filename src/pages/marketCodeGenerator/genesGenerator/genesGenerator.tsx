import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { SyntheticEvent, useEffect } from 'react';
import _ from 'lodash';
import './genesGenerator.css';
import { AXIE_PARTS, AXIE_PARTS_CLASSES, GENES_TYPES } from '../../../core/constants/constants';
import { Checkbox, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, previousStep, submitGenes } from '../../../core/redux/marketCodeGenerator/actions';
import { getFormData } from '../../../core/redux/marketCodeGenerator/selectors';

const formData: any = {};
AXIE_PARTS.forEach((part) => {
    GENES_TYPES.forEach((gene) => {
        formData[part + '-' + gene] = {
            value: [],
            inputValue: '',
        };
    });
});

const GenesGenerator: React.FunctionComponent = () => {
    const [axieCards, setAxieCards] = React.useState<any>();
    const [formState, setFormState] = React.useState<any>(formData);
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useDispatch();
    const formDataState: any = useSelector((state) => getFormData(state));

    useEffect(() => {
        if (Object.keys(formDataState.genes).length > 0) {
            setFormState(formDataState.genes);
        }
    }, []);

    const onPreviousStepClick = () => {
        dispatch(submitGenes({ genes: formState }));
        dispatch(previousStep());
    };

    const onNextStepClick = () => {
        dispatch(submitGenes({ genes: formState }));
        dispatch(nextStep());
    };

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

    const getAxieCardsOptions = (axiePart: string) => {
        const axiePartsArray = axieCards[axiePart].map((axieCard: any) => {
            return {
                label: axieCard.name,
                id: axieCard.partId,
            };
        });
        return axiePartsArray;
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

    const getFormattedGenes = () => {
        const arrayItemsRegex = new RegExp(/[\[|\]|\"]/, 'g');
        const genesKeys = Object.keys(formState);
        let formattedGenes = '';
        genesKeys.forEach((geneKey, index) => {
            const [part] = geneKey.split('-');
            const formValue = formState[geneKey].value;
            // Every 3 iteration means D, R1, R2
            if ((index + 1) % 3 === 0) {
                if (formValue.length === 0 || formValue.includes(`${part}-wildcard`)) {
                    formattedGenes += `${part}-wildcard/`;
                } else {
                    formattedGenes += `${JSON.stringify(formValue)
                        .replaceAll(arrayItemsRegex, '')
                        .replaceAll(',', '&')}/`;
                }
            } else {
                if (formValue.length === 0 || formValue.includes(`${part}-wildcard`)) {
                    formattedGenes += `${part}-wildcard,`;
                } else {
                    formattedGenes += `${JSON.stringify(formValue)
                        .replaceAll(arrayItemsRegex, '')
                        .replaceAll(',', '&')},`;
                }
            }
        });

        return formattedGenes;
    };
    return (
        <div className="genes-generator">
            {!isLoading && (
                <div className="content-container">
                    <div className="genes-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Dominant</th>
                                    <th>Recessive 1</th>
                                    <th>Recessive 2</th>
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
                                                        multiple
                                                        disableCloseOnSelect
                                                        limitTags={1}
                                                        id={part + '-' + geneType}
                                                        value={formState[part + '-' + geneType].value}
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                                        onChange={(event, newValue, reason) =>
                                                            handleChange(event, newValue, reason, part + '-' + geneType)
                                                        }
                                                        inputValue={formState[part + '-' + geneType].inputValue}
                                                        onInputChange={(event, newValue) =>
                                                            handleInputChange(event, newValue, part + '-' + geneType)
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
                                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
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
                    <div className="footer">
                        <Button className="step-button" variant="contained" onClick={onPreviousStepClick}>
                            Previous step
                        </Button>
                        <Button className="step-button" variant="contained" onClick={onNextStepClick}>
                            Next step
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenesGenerator;
