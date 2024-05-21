import { axios } from 'boot/axios.js';
// import { APIKEY } from 'components/APIKEY.js';
import * as helpers from 'components/helpers.js';

export function trade ({ state, commit }, payload) {
    commit('mutateFunding', payload.tradeAmt);

    const index = state.playerAccount.holdings.findIndex(stock => stock.symbol === payload.symbol);
    payload.index = index;
    console.log(`payload.quantity = ${payload.quantity}`);
    console.log(typeof payload.quantity);
    if (payload.quantity > 0 && index < 0) {
        payload.case = 'CREATE';
        delete payload.tradeAmt;
        commit('mutateHoldings', payload);
    } else if (Math.abs(payload.quantity) === state.playerAccount.holdings[index].quantity) {
        payload.case = 'REMOVE';
        commit('mutateHoldings', payload);
    } else {
        payload.case = 'TRADE';
        commit('mutateHoldings', payload);
    }
}

export function resetGame ({ commit }) {
    console.log('dispatch action reset game');
    commit('setStartCycle');
    commit('resetGame');
}

export async function initGameData ({ commit, state }, payload) {
    console.log('no local data');
    commit('setStartCycle');
    commit('keyValidity', true);
    // response 1 is the unhandled raw response
    const response1 = await axios.get('http://api.marketstack.com/v1/exchanges/XNAS/tickers',
        {
            params: {
                access_key: payload
            }
        }
    )
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    })
    if (response1.status !== 200) {
        console.log('invalid key');
        commit('keyValidity', false);
        return;
    }
    console.log('valid key');
    const gameData = [];
    // the upper limit for i need to change to a bigger data bank
    let index = 0;
    while (gameData.length < state.totalStockCount) {
        // these two particular stocks are excluded
        // please see readMe for  more details
        if (index === 4 || index === 5) {
            index++;
            continue;
        }
        console.log(response1.data.data.tickers[index].name);
        gameData.push(helpers.trimObj(response1.data.data.tickers[index]));
        index++;
    }

    console.log('start delay, after adding all tickers to gameData');
    await helpers.rateDelay();
    console.log('delay complete');

    const promises = [];
    for (let i = 0; i < gameData.length; i++) {
        // insert block code to add 1.5 second after sending 5 requests
        // rate limit: max 5 requests per sec
        if (i === 5) {
            console.log('start delay, help with rate limit');
            await helpers.rateDelay();
            console.log('delay complete');
        }
        console.log(`about to request ${i}`);
        promises.push(axios.get('http://api.marketstack.com/v1/eod',
            {
                params: {
                    access_key: payload,
                    symbols: gameData[i].symbol
                }
            }
        )
        .then(response => {
            gameData[i].prices = helpers.mapPrices(response.data.data);
        })
        );
    }

    Promise.all(promises).then(() => {
        console.log('all requests resolved, store to local storage next');
        localStorage.setItem('game_data', JSON.stringify(gameData));
        commit('dataValidity');
        // maybe need a new mutation
        // save the gameData to the store
        // it would be useful when resetting the game
        commit('initGameMarket', { data: gameData });
    });
}
