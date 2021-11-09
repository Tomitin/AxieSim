import React from 'react';
import './marketCodeGenerator.css';
import CodeGeneratorLayout from '../../layouts/codeGeneratorLayout/codeGeneratorLayout';
import { useSelector } from 'react-redux';
import { getFormStep } from '../../core/redux/marketCodeGenerator/selectors';
import CommandPick from './commandPick/commandPick';
import GenesGenerator from './genesGenerator/genesGenerator';
import FilterSettings from './filterSettings/filterSettings';
import Success from './success/success';

const MarketCodeGenerator: React.FunctionComponent = () => {
    const formStep: number = useSelector((state) => getFormStep(state));

    const getFormByStep = (step: number) => {
        switch (step) {
            case 1:
                return <CommandPick />;
            case 2:
                return <GenesGenerator />;
            case 3:
                return <FilterSettings />;
            case 4:
                return <Success />;
            default:
                break;
        }
    };

    const getTitleByStep = (step: number): string => {
        switch (step) {
            case 1:
                return 'Select a command';
            case 2:
                return 'Select genes 🧬 (All genes are optional)';
            case 3:
                return 'Marketplace filters';
            case 4:
                return 'Your code has been generated!';
            default:
                return '';
        }
    };

    return <CodeGeneratorLayout name={getTitleByStep(formStep)}>{getFormByStep(formStep)}</CodeGeneratorLayout>;
};

export default MarketCodeGenerator;
