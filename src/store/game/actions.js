import { axios } from 'boot/axios.js';
import * as helpers from 'components/helpers.js';

export function trade ({ state, commit }, payload) {
    commit('mutateFunding', payload.tradeAmt);

    const index = state.playerAccount.holdings.findIndex(stock => stock.symbol === payload.symbol);
    payload.index = index;
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
    commit('setStartCycle');
    commit('resetGame');
}

export async function initGameData ({ commit, state }, payload) {
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
        commit('keyValidity', false);
        return;
    }
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
        gameData.push(helpers.trimObj(response1.data.data.tickers[index]));
        index++;
    }

    await helpers.rateDelay();

    const promises = [];
    for (let i = 0; i < gameData.length; i++) {
        // insert block code to add 1.5 second after sending 5 requests
        // rate limit: max 5 requests per sec
        if (i === 5) {
            await helpers.rateDelay();
        }
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
        localStorage.setItem('game_data', JSON.stringify(gameData));
        commit('dataValidity');
        commit('initGameMarket', { data: gameData });
    });
}
