import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';
import * as helpers from 'components/helpers.js';

export function trade ({ state, commit }, payload) {
    // change funding in state
    commit('mutateFunding', payload.tradeAmt);

    const index = state.playerAccount.holdings.findIndex(stock => stock.symbol === payload.symbol);
    // this is buying logic
    if (payload.quantity > 0) {
        if (index < 0) {
            console.log('create new holding');
            payload.case = 'CREATE';
            delete payload.tradeAmt;
            commit('mutateHoldings', payload)
        } else {
            console.log('add to existing holdings of stock');
            payload.case = 'ADD';
            payload.index = index;
            commit('mutateHoldings', payload)
        }
    } else {
        // this is selling logic
        payload.index = index;
        if (-payload.quantity === state.playerAccount.holdings[index].quantity) {
            console.log('sell all');
            payload.case = 'REMOVE';
            commit('mutateHoldings', payload);
        } else {
            console.log('see part of the existing stock');
            payload.case = 'DEDUCT';
            commit('mutateHoldings', payload);
        }
    }
}

export async function initGameData ({ commit }) {
    // response 1 is the unhandled raw response
    const response1 = await axios.get('http://api.marketstack.com/v1/tickers',
    {
        params: {
            access_key: APIKEY
        }
    });

    const gameData = [];
    // for (let i = 0; i <= 3; i++) {
    // range for the below for loop is for only one testing stock data
    for (let i = 0; i < 1; i++) {
        gameData.push(helpers.trimObj(response1.data.data[i]));
    };

    const promises = [];
    for (let i = 0; i < gameData.length; i++) {
        promises.push(axios.get('http://api.marketstack.com/v1/eod',
                {
                    params: {
                        access_key: APIKEY,
                        symbols: gameData[i].symbol
                    }
                }
            )
                .then(response => {
                    gameData[i].prices = helpers.mapPrices(response.data.data);
                })
        )
    }

    Promise.all(promises).then(() => {
            localStorage.setItem('game_data', JSON.stringify(gameData));
            commit('initGameMarket', { gameData });
        }
    )
}
