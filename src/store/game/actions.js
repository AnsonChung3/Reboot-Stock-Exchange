import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';
import * as helpers from 'components/helpers.js';

export function trade ({ state, commit }, payload) {
    const index = state.playerAccount.holdings.findIndex(stock => stock.symbol === payload.symbol);
    // this is buying logic
    if (payload.tradeQty > 0) {
        if (index < 0) {
            console.log('create new holding');
            commit('mutateHoldings', {
                case: 'CREATE',
                symbol: payload.symbol,
                qty: payload.tradeQty
            })
        } else {
            console.log('add to existing holdings of stock');
            commit('mutateHoldings', {
                case: 'ADD',
                index,
                qty: payload.tradeQty
            })
        }
    } else {
        // this is selling logic
        if (payload.tradeQty === state.playerAccount.holdings[index].quantity) {
            console.log('sell all');
        } else {
            console.log('see part of the existing stock');
        }
    }
    // change funding in state
    commit('mutateFunding', payload.tradeAmt);
}

export async function initGameData () {
    // console.log('action - init game data');

    // response 1 is the unhandled raw response
    const response1 = await axios.get('http://api.marketstack.com/v1/tickers',
    {
        params: {
            access_key: APIKEY
        }
    });

    // console.log('request for tickers success');

    const gameData = [];
    // response one get's handled here
    for (let i = 0; i <= 3; i++) {
        gameData.push(helpers.trimObj(response1.data.data[i]));
    };

    // console.log('end of for loop, print game data');
    // console.log(gameData);

    const promises = [];
    // IT USES 2 API REQUETS IN ONE GO
    for (let i = 0; i <= 1; i++) {
        promises.push(axios.get('http://api.marketstack.com/v1/eod',
                {
                    params: {
                        access_key: APIKEY,
                        symbols: gameData[i].symbol
                    }
                }
            )
                .then(response => {
                    // console.log('request for individual price success');
                    gameData[i].prices = helpers.mapPrices(response.data.data);
                    // console.log(gameData);
                })
        )
    }

    Promise.all(promises).then(() => {
            // console.log('promises.all');
            // console.log(gameData);
            // local storage set item
            localStorage.setItem('game_data', JSON.stringify(gameData));
            // call mutation, and populate store from local storage
        }
    )
    // console.log('end of action - init game');
}
