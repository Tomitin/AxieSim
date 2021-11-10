import React from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import './success.css';
import { nextStep, previousStep, submitCommandName } from '../../../core/redux/marketCodeGenerator/actions';
import { useDispatch, useSelector } from 'react-redux';
import ClipboardTextComponent from '../../../components/clipboardText/clipboardText';
import { getFormData } from '../../../core/redux/marketCodeGenerator/selectors';

const Success: React.FunctionComponent = () => {
    const formDataState: any = useSelector((state) => getFormData(state));
    const dispatch = useDispatch();

    const onNextStepClick = () => {
        location.reload();
    };

    const onPreviousStepClick = () => {
        dispatch(previousStep());
    };

    const getFormattedGenes = () => {
        const formState = formDataState.genes;
        const arrayItemsRegex = new RegExp(/[\[|\]|\"]/, 'g');
        const genesKeys = Object.keys(formState);
        let formattedGenes = '';
        genesKeys.forEach((geneKey, index) => {
            const [part] = geneKey.split('-');
            const formValue = formState[geneKey].value.map((option: any) => option.id);
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

    const formatFormContent = () => {
        const filters = formDataState.filters;
        const isSearchMarket = formDataState.commandName === '!searchmarket';
        const arrayItemsRegex = new RegExp(/[\[|\]|\"]/, 'g');
        const formattedPureness = 'pureness,' + filters.pureness;
        const formattedBreedCount = 'breedcount,' + JSON.stringify(filters.breedCount).replaceAll(arrayItemsRegex, '');
        const formattedMaxAxiePrice = filters.maxPrice ? 'maxprice,' + filters.maxPrice : '';
        const formattedMaxAxieId = filters.maxId ? 'maxid,' + filters.maxId : '';
        const formattedMarketPage = 'marketpage,' + filters.marketPage;
        const formattedMaxAxieSearch = 'maxsearch,' + filters.maxAxiesToSearch;
        const formattedExpirateDate = filters.expirateDate ? 'notificationlife,' + filters.expirateDate : '';
        const formattedSpeed = 'speed,' + JSON.stringify(filters.speed).replaceAll(arrayItemsRegex, '');
        const formattedAxieClasses =
            filters.axieClasses.length > 0
                ? 'classes,' + JSON.stringify(filters.axieClasses).replaceAll(arrayItemsRegex, '').replaceAll(',', '&')
                : '';

        const formattedGenes = getFormattedGenes();

        const formattedString = `${
            formDataState.commandName
        } ${formattedGenes}${formattedPureness}/${formattedBreedCount}${
            !!formattedMaxAxiePrice ? '/' + formattedMaxAxiePrice : ''
        }${isSearchMarket ? '/' + formattedMarketPage : ''}${isSearchMarket ? '/' + formattedMaxAxieSearch : ''}${
            !!formattedExpirateDate ? '/' + formattedExpirateDate : ''
        }/${formattedSpeed}${!!formattedAxieClasses ? '/' + formattedAxieClasses : ''}${
            !!formattedMaxAxieId ? '/' + formattedMaxAxieId : ''
        }`;

        return formattedString;
    };

    return (
        <div className="success-container">
            <div className="success-content">
                <ClipboardTextComponent fullWidth={true} textToCopy={formatFormContent()}>
                    Copy code
                </ClipboardTextComponent>
            </div>
            <div className="footer">
                <Button className="step-button" variant="contained" onClick={onPreviousStepClick}>
                    Previous step
                </Button>
                <Button className="step-button" variant="contained" onClick={onNextStepClick}>
                    New code
                </Button>
            </div>
        </div>
    );
};

export default Success;
