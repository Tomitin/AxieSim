import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, Slider, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect } from 'react';
import _ from 'lodash';
import './marketCodeGenerator.css';
import { AXIE_PARTS, AXIE_PARTS_CLASSES, GENES_TYPES } from '../../core/constants/constants';
import ClipboardTextComponent from '../../components/clipboardText/clipboardText';

const formData: any = {};
AXIE_PARTS.forEach((part) => {
    GENES_TYPES.forEach((gene) => {
        formData[part + '-' + gene] = [];
    });
});

const MarketCodeGenerator: React.FunctionComponent = () => {
    const [axieCards, setAxieCards] = React.useState<any>();
    const [breedCount, setBreedCount] = React.useState<number[]>([0, 7]);
    const [pureness, setPureness] = React.useState<any>(0);
    const [marketPage, setMarketPage] = React.useState<any>(1);
    const [maxAxiePrice, setMaxAxiePrice] = React.useState<any>(1000);
    const [maxAxiesSearch, setMaxAxiesSearch] = React.useState<any>(100);
    const [formState, setFormState] = React.useState<any>(formData);
    const [isLoading, setIsLoading] = React.useState(true);
    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (!!name) {
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    };

    const handleBreedCountChange = (event: React.ChangeEvent<unknown>, newValue: number[] | number) => {
        if (Array.isArray(newValue)) {
            setBreedCount(newValue);
        }
    };

    const handlePurenessChange = (event: React.ChangeEvent<unknown>, newValue: number[] | number) => {
        setPureness(newValue);
    };

    const handleMaxAxiesSearchChange = (event: React.ChangeEvent<unknown>, newValue: number[] | number) => {
        setMaxAxiesSearch(newValue);
    };

    const handleMarketPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarketPage(event.target.value == '0' ? '1' : event.target.value);
    };

    const handleMaxAxiePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAxiePrice(event.target.value);
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

    const displayAxieCards = (axiePart: string) => {
        const axiePartsArray = axieCards[axiePart].map((axieCard: any) => (
            <MenuItem key={axieCard.partId} value={axieCard.partId}>
                {axieCard.name}
            </MenuItem>
        ));
        axiePartsArray.unshift(<MenuItem value={axiePart + '-wildcard'}>{'Any ' + axiePart}</MenuItem>);
        return axiePartsArray;
    };

    const displayAxieEyesEars = (axiePart: string) => {
        const axiePartsArray = AXIE_PARTS_CLASSES.map((axieClass) => (
            <MenuItem key={axiePart + '-' + axieClass} value={axiePart + '-' + axieClass}>
                {axiePart + ' ' + axieClass}
            </MenuItem>
        ));
        axiePartsArray.unshift(<MenuItem value={axiePart + '-wildcard'}>{'Any ' + axiePart}</MenuItem>);
        return axiePartsArray;
    };

    const getFormattedGenes = () => {
        const arrayItemsRegex = new RegExp(/[\[|\]|\"]/, 'g');
        const genesKeys = Object.keys(formState);
        let formattedGenes = '';
        genesKeys.forEach((geneKey, index) => {
            const [part, geneType] = geneKey.split('-');
            // Every 3 iteration means D, R1, R2
            if ((index + 1) % 3 === 0) {
                if (
                    formState[part + '-' + geneType].length === 0 ||
                    formState[part + '-' + geneType].includes(`${part}-wildcard`)
                ) {
                    formattedGenes += `${part}-wildcard/`;
                } else {
                    formattedGenes += `${JSON.stringify(formState[part + '-' + geneType])
                        .replaceAll(arrayItemsRegex, '')
                        .replaceAll(',', '&')}/`;
                }
            } else {
                if (
                    formState[part + '-' + geneType].length === 0 ||
                    formState[part + '-' + geneType].includes(`${part}-wildcard`)
                ) {
                    formattedGenes += `${part}-wildcard,`;
                } else {
                    formattedGenes += `${JSON.stringify(formState[part + '-' + geneType])
                        .replaceAll(arrayItemsRegex, '')
                        .replaceAll(',', '&')},`;
                }
            }
        });

        return formattedGenes;
    };

    const formatFormContent = () => {
        const arrayItemsRegex = new RegExp(/[\[|\]|\"]/, 'g');
        const formattedPureness = 'pureness,' + pureness;
        const formattedBreedCount = 'breedcount,' + JSON.stringify(breedCount).replaceAll(arrayItemsRegex, '');
        const formattedMaxAxiePrice = 'maxprice,' + maxAxiePrice;
        const formattedMarketPage = 'marketpage,' + marketPage;
        const formattedMaxAxieSearch = 'maxsearch,' + maxAxiesSearch;

        const formattedGenes = getFormattedGenes();
        const formattedString = `${formattedGenes}${formattedPureness}/${formattedBreedCount}/${formattedMaxAxiePrice}/${formattedMarketPage}/${formattedMaxAxieSearch}`;

        return formattedString;
    };
    return (
        <div className="market-code-generator">
            <div className="title-container">
                <Typography variant="h4" component="h1">
                    Generate your build to watch!
                </Typography>
                <Typography variant="h6">
                    Select the genes you want for your search and then paste in discord the generated code.{' '}
                </Typography>
                <Typography variant="h6">
                    <strong>Note:</strong> Many genes can be set in the same select menu.
                </Typography>
            </div>
            {!isLoading && (
                <div className="axie-form">
                    <div className="generated-code">
                        <strong> Generated code:</strong>
                        <ClipboardTextComponent fullWidth={true} textToCopy={formatFormContent()}>
                            {formatFormContent()}
                        </ClipboardTextComponent>
                    </div>
                    <div className="axie-genes-form-container">
                        <div className="side-form">
                            <Typography variant="h6">
                                <strong>Axie filters:</strong>
                            </Typography>
                            <div className="slider-container">
                                Breed count:
                                <Slider
                                    value={breedCount}
                                    onChange={handleBreedCountChange}
                                    valueLabelDisplay="auto"
                                    max={7}
                                />
                            </div>
                            <div className="slider-container">
                                Pureness:
                                <Slider
                                    value={pureness}
                                    onChange={handlePurenessChange}
                                    valueLabelDisplay="auto"
                                    max={6}
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
                            <hr />
                            <Typography variant="h6">
                                <strong>Market filters:</strong>
                            </Typography>
                            <div className="slider-container">
                                Max axies to search:
                                <Slider
                                    value={maxAxiesSearch}
                                    onChange={handleMaxAxiesSearchChange}
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={100}
                                />
                            </div>
                            <div className="slider-container">
                                Market page:
                                <input
                                    type="number"
                                    onChange={handleMarketPageChange}
                                    value={marketPage}
                                    defaultValue="1"
                                    min="1"
                                    step="1"
                                    onKeyPress={(event) => {
                                        if (!!event.key.match(/[\.\+\-]/)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div>
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
                                                        <Select
                                                            labelId="multiple-chip-label"
                                                            id="multiple-chip"
                                                            multiple
                                                            name={part + '-' + geneType}
                                                            value={formState[part + '-' + geneType]}
                                                            onChange={handleChange}
                                                            input={
                                                                <OutlinedInput id="select-multiple-chip" label="Chip" />
                                                            }
                                                            renderValue={(selected: any) => (
                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                    {selected.map((value: string) => (
                                                                        <Chip key={value} label={value} />
                                                                    ))}
                                                                </Box>
                                                            )}
                                                        >
                                                            {part === 'eyes' || part === 'ears'
                                                                ? displayAxieEyesEars(part)
                                                                : displayAxieCards(part)}
                                                        </Select>
                                                    </FormControl>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketCodeGenerator;
