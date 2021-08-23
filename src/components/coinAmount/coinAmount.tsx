import { Box } from '@material-ui/core';
import React from 'react';
import { COIN } from '../../constants/constants';
import './coinAmount.css';

type CoinType = 'AXS' | 'SLP';

interface CoinAmountComponentProps {
    coinType: CoinType;
    amount: string | number;
}

const CoinAmountComponent: React.FunctionComponent<CoinAmountComponentProps> = (props: CoinAmountComponentProps) => {
    const getSrcByCoinType = (coinType: CoinType) => {
        switch (coinType) {
            case COIN.AXS_COIN:
                return '/axs.png';
            case COIN.SLP_COIN:
                return '/SLP.png';
        }
    };

    return (
        <Box className="coin-amount">
            {props.amount}
            <img className="coin-image" alt="coin" src={process.env.PUBLIC_URL + getSrcByCoinType(props.coinType)} />
        </Box>
    );
};

export default CoinAmountComponent;
