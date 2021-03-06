/**
 * @jest-environment jsdom
 */

import { BigNumber } from '0x.js';
import React from 'react';

import { OrderBookTableWithTheme } from '../../../../components/erc20/marketplace/order_book';
import { openOrder, tokenFactory } from '../../../../util/test-utils';
import { OrderSide, TokenSymbol, Web3State } from '../../../../util/types';
import { mountWithTheme } from '../../../util/test_with_theme';

describe('OrderBookTable', () => {
    const absoluteSpread = new BigNumber('0.03');
    const percentageSpread = new BigNumber('3');
    it('Renders my size column with value', () => {
        const orderBook = {
            sellOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.02'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('4'),
                    price: new BigNumber('1.01'),
                },
            ],
            buyOrders: [
                {
                    side: OrderSide.Buy,
                    size: new BigNumber('2'),
                    price: new BigNumber('0.5'),
                },
            ],
            mySizeOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
            ],
        };

        const baseToken = tokenFactory.build();
        const quoteToken = tokenFactory.build();

        const userOrder1 = openOrder({
            side: OrderSide.Buy,
            size: new BigNumber(2),
            price: new BigNumber('0.5'),
        });

        const userOrders = [userOrder1];

        // when
        const wrapper = mountWithTheme(
            <OrderBookTableWithTheme
                orderBook={orderBook}
                baseToken={baseToken}
                quoteToken={quoteToken}
                userOrders={userOrders}
                absoluteSpread={absoluteSpread}
                percentageSpread={percentageSpread}
            />,
        );
        // then
        const mySizeRowValue = wrapper
            .find('CardBase')
            .find('#mySize')
            .at(1);
        expect(mySizeRowValue.text()).toEqual('1.0000');
    });
    it('Should render a row of mySize with the total amount for one order', () => {
        const orderBook = {
            sellOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('4'),
                    price: new BigNumber('1.01'),
                },
            ],
            buyOrders: [
                {
                    side: OrderSide.Buy,
                    size: new BigNumber('2'),
                    price: new BigNumber('0.5'),
                },
            ],
            mySizeOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
            ],
        };

        const baseToken = tokenFactory.build();
        const quoteToken = tokenFactory.build();

        const userOrder1 = openOrder({
            side: OrderSide.Buy,
            size: new BigNumber(2),
            price: new BigNumber('0.5'),
        });

        const userOrders = [userOrder1];

        // when
        const wrapper = mountWithTheme(
            <OrderBookTableWithTheme
                orderBook={orderBook}
                baseToken={baseToken}
                quoteToken={quoteToken}
                userOrders={userOrders}
                percentageSpread={percentageSpread}
                absoluteSpread={absoluteSpread}
            />,
        );

        // then
        const mySizeRowValue = wrapper
            .find('CardBase')
            .find('#mySize')
            .at(1);
        expect(mySizeRowValue.text()).toEqual('2.0000');
    });
    it('Check if my size renders an item with more than two decimals', () => {
        const orderBook = {
            sellOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1.1234567'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1.123456'),
                    price: new BigNumber('1.02'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1.12345'),
                    price: new BigNumber('1.01'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1.1234'),
                    price: new BigNumber('1.01'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1.123'),
                    price: new BigNumber('1.01'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1.12'),
                    price: new BigNumber('1.01'),
                },
            ],
            buyOrders: [
                {
                    side: OrderSide.Buy,
                    size: new BigNumber('2'),
                    price: new BigNumber('0.5'),
                },
            ],
            mySizeOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
            ],
        };

        const baseToken = tokenFactory.build();
        const quoteToken = tokenFactory.build();

        const userOrder1 = openOrder({
            side: OrderSide.Buy,
            size: new BigNumber(2),
            price: new BigNumber('0.5'),
        });

        const resultExpected1 = '1.1235';
        const resultExpected2 = '1.1235';
        const resultExpected3 = '1.1235';
        const resultExpected4 = '1.1234';
        const resultExpected5 = '1.123';
        const resultExpected6 = '1.12';

        const userOrders = [userOrder1];

        // when
        const wrapper = mountWithTheme(
            <OrderBookTableWithTheme
                orderBook={orderBook}
                baseToken={baseToken}
                quoteToken={quoteToken}
                userOrders={userOrders}
                absoluteSpread={absoluteSpread}
                percentageSpread={percentageSpread}
            />,
        );

        const baseRows = wrapper.find('CardBase').find('span');

        // then
        const sizeRow1 = baseRows.at(0).text();
        const sizeRow2 = baseRows.at(2).text();
        const sizeRow3 = baseRows.at(4).text();
        const sizeRow4 = baseRows.at(6).text();
        const sizeRow5 = baseRows.at(8).text();
        const sizeRow6 = baseRows.at(10).text();

        expect(sizeRow1).toEqual(resultExpected1);
        expect(sizeRow2).toEqual(resultExpected2);
        expect(sizeRow3).toEqual(resultExpected3);
        expect(sizeRow4).toEqual(resultExpected4);
        expect(sizeRow5).toEqual(resultExpected5);
        expect(sizeRow6).toEqual(resultExpected6);
    });
    it('Should not render my size column if the user does not have metamask', () => {
        const orderBook = {
            sellOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('4'),
                    price: new BigNumber('1.01'),
                },
            ],
            buyOrders: [
                {
                    side: OrderSide.Buy,
                    size: new BigNumber('2'),
                    price: new BigNumber('0.5'),
                },
            ],
            mySizeOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
            ],
        };

        const token = {
            address: '0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c',
            decimals: 0,
            name: '0x',
            symbol: TokenSymbol.Zrx,
            primaryColor: '#ccc',
        };

        const userOrder1 = openOrder({
            side: OrderSide.Buy,
            size: new BigNumber(2),
            price: new BigNumber('0.5'),
        });

        const userOrders = [userOrder1];

        // when
        const wrapper = mountWithTheme(
            <OrderBookTableWithTheme
                orderBook={orderBook}
                baseToken={token}
                quoteToken={token}
                userOrders={userOrders}
                web3State={Web3State.NotInstalled}
                absoluteSpread={absoluteSpread}
                percentageSpread={percentageSpread}
            />,
        );

        // then
        expect(wrapper.text()).not.toContain('My Size');
    });
    it('Should not render my size column if the user rejected the metamask permissions', () => {
        const orderBook = {
            sellOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('4'),
                    price: new BigNumber('1.01'),
                },
            ],
            buyOrders: [
                {
                    side: OrderSide.Buy,
                    size: new BigNumber('2'),
                    price: new BigNumber('0.5'),
                },
            ],
            mySizeOrders: [
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
                {
                    side: OrderSide.Sell,
                    size: new BigNumber('1'),
                    price: new BigNumber('1.5'),
                },
            ],
        };

        const token = {
            address: '0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c',
            decimals: 0,
            name: '0x',
            symbol: TokenSymbol.Zrx,
            primaryColor: '#ccc',
        };

        const userOrder1 = openOrder({
            side: OrderSide.Buy,
            size: new BigNumber(2),
            price: new BigNumber('0.5'),
        });

        const userOrders = [userOrder1];

        // when
        const wrapper = mountWithTheme(
            <OrderBookTableWithTheme
                orderBook={orderBook}
                baseToken={token}
                quoteToken={token}
                userOrders={userOrders}
                web3State={Web3State.Locked}
                absoluteSpread={absoluteSpread}
                percentageSpread={percentageSpread}
            />,
        );

        // then
        expect(wrapper.text()).not.toContain('My Size');
    });
});
