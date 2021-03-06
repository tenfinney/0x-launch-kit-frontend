import queryString from 'query-string';
import { getType } from 'typesafe-actions';

import { MarketState, TokenSymbol } from '../../util/types';
import * as actions from '../actions';
import { RootAction } from '../reducers';

const initialMarketState: MarketState = {
    currencyPair: {
        base: (queryString.parse(window.location.search).base as TokenSymbol) || TokenSymbol.Zrx,
        quote: (queryString.parse(window.location.search).quote as TokenSymbol) || TokenSymbol.Weth,
    },
    baseToken: null,
    quoteToken: null,
    markets: null,
    ethInUsd: null,
};

export function market(state: MarketState = initialMarketState, action: RootAction): MarketState {
    switch (action.type) {
        case getType(actions.setMarketTokens):
            return { ...state, baseToken: action.payload.baseToken, quoteToken: action.payload.quoteToken };
        case getType(actions.setCurrencyPair):
            return { ...state, currencyPair: action.payload };
        case getType(actions.setMarkets):
            return { ...state, markets: action.payload };
        case getType(actions.fetchMarketPriceEtherUpdate):
            return { ...state, ethInUsd: action.payload };
        case getType(actions.fetchMarketPriceEtherStart):
            return state;
        case getType(actions.fetchMarketPriceEtherError):
            return state;
        default:
            return state;
    }
}
