import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './filterSettings.css';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, previousStep, submitFilters } from '../../../core/redux/marketCodeGenerator/actions';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { AXIE_CLASSES } from '../../../core/constants/constants';
import Grid from '@mui/material/Grid';
import { getCommandName } from '../../../core/redux/marketCodeGenerator/selectors';

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

const maxAxiesMarks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 100,
        label: '100',
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

const expirateDateMarks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 120,
        label: '120hs',
    },
];

const FilterSettings: React.FunctionComponent = () => {
    const [breedCount, setBreedCount] = React.useState<number[]>([0, 7]);
    const [speed, setSpeed] = React.useState<number[]>([27, 61]);
    const [pureness, setPureness] = React.useState<any>(0);
    const [maxAxieId, setMaxAxieId] = React.useState<any>(0);
    const [marketPage, setMarketPage] = React.useState<any>(1);
    const [maxAxiePrice, setMaxAxiePrice] = React.useState<any>(0);
    const [expirateDate, setExpirateDate] = React.useState<any>(0);
    const [maxAxiesSearch, setMaxAxiesSearch] = React.useState<any>(100);
    const [axieClasses, setAxieClasses] = React.useState<any>([]);
    const [classesInput, setClassesInput] = React.useState<any>('');
    const commandName: string = useSelector((state) => getCommandName(state));
    const dispatch = useDispatch();

    const onPreviousStepClick = () => {
        dispatch(submitFilters({}));
        dispatch(previousStep());
    };

    const onNextStepClick = () => {
        dispatch(
            submitFilters({
                filters: {
                    speed,
                    maxPrice: maxAxiePrice == '0' ? null : maxAxiePrice,
                    maxId: maxAxieId == '0' ? null : maxAxieId,
                    axieClasses,
                    breedCount,
                    pureness,
                    maxAxiesToSearch: maxAxiesSearch,
                    marketPage,
                    expirateDate: expirateDate == '0' ? null : expirateDate,
                },
            }),
        );
        dispatch(nextStep());
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

    const handleMaxAxiesSearchChange = (event: Event, newValue: number[] | number) => {
        setMaxAxiesSearch(newValue);
    };

    const handleMarketPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarketPage(event.target.value == '0' ? '1' : event.target.value);
    };

    const handleMaxAxiePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAxiePrice(event.target.value);
    };

    const handleMaxAxieIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAxieId(event.target.value);
    };

    const handleExpireDateChange = (event: Event, newValue: number[] | number) => {
        setExpirateDate(newValue);
    };

    const handleClassesChange = (event: React.SyntheticEvent<Element, Event>, newValue: unknown, reason: string) => {
        setAxieClasses(newValue);
    };

    const handleClassesInputChange = (event: React.SyntheticEvent<Element, Event>, newValue: unknown) => {
        setClassesInput(newValue);
    };

    return (
        <div className="filter-settings">
            <div className="settings-form">
                <div>
                    <Grid container spacing={6}>
                        <Grid item sm={12} lg={6}>
                            <Typography variant="h6">
                                <strong>Axie filters:</strong>
                            </Typography>
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
                                    renderInput={(params: any) => <TextField {...params} placeholder="Axie class" />}
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

                            {(commandName === '!notifyme' || commandName === '!searchmarket') && (
                                <>
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
                                </>
                            )}
                            {(commandName === '!notifyme' || commandName === '!searchmarket') && (
                                <>
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
                                </>
                            )}
                            {(commandName === '!notifyme' || commandName === '!searchmarket') && (
                                <>
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
                                </>
                            )}
                            <div className="slider-container">
                                Max axie Id:
                                <input
                                    type="number"
                                    onChange={handleMaxAxieIdChange}
                                    value={maxAxieId}
                                    min="0"
                                    onKeyPress={(event) => {
                                        if (event.key === '+' || event.key === '-') {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12} lg={6}>
                            <Typography variant="h6">
                                <strong>Notification settings:</strong>
                            </Typography>
                            {commandName === '!notifyme' && (
                                <>
                                    <div className="slider-container">
                                        Expire notification in:
                                        <Slider
                                            value={expirateDate}
                                            marks={expirateDateMarks}
                                            onChange={handleExpireDateChange}
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={120}
                                        />
                                    </div>
                                </>
                            )}
                            {(commandName === '!searchmarket' || commandName === '!searchsales') && (
                                <>
                                    <div className="slider-container">
                                        Max axies to search:
                                        <Slider
                                            value={maxAxiesSearch}
                                            marks={maxAxiesMarks}
                                            onChange={handleMaxAxiesSearchChange}
                                            valueLabelDisplay="auto"
                                            min={1}
                                            max={100}
                                        />
                                    </div>
                                </>
                            )}
                            {commandName === '!searchmarket' && (
                                <>
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
                                </>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="footer">
                <Button className="step-button" variant="contained" onClick={onPreviousStepClick}>
                    Previous step
                </Button>
                <Button className="step-button" variant="contained" onClick={onNextStepClick}>
                    Generate code
                </Button>
            </div>
        </div>
    );
};

export default FilterSettings;
