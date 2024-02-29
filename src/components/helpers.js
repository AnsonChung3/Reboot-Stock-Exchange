import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';

export function prototypeInit () {
    // the array of symbols should be populated from API response
    const symbols = ['AAPL'];
    // with Array.forEach(), can loop through tickers, and have the price data come in sorted
    // date_from can also be set to dynamic, -6 months from present day
    symbols.forEach((ticker) => {
        axios.get('http://api.marketstack.com/v1/eod',
            {
                params: {
                    access_key: APIKEY,
                    symbols: ticker,
                    date_from: '2024-02-26'
                }
            }
        )
            .then(response => {
                const data = JSON.stringify(response.data.data.map((day) => day.open));
                localStorage.setItem('AAPL_Price_data', data);
                console.log('reading frm local storage');
                console.log(localStorage.getItem('AAPL_Price_data'));
            })
    })
    // all the data can then be stored in local storage
    // vuex store can populate data from local storage then
}

export function callDataFromAPI () {
    axios.get('http://api.marketstack.com/v1/eod',
        {
            params: {
                access_key: APIKEY,
                // request count is on tickers,
                // so 1 eod/latest for 2 tickers, counts as 2 requests
                // but 2 days of eod for 1 ticker, counts as 1 request
                // it should be one string, comma separated symbols, no space
                // appearantly data comes in [ { day 1 AAPL }, { day 1 MSFT }, { day 2 AAPL }, { day 2 MSFT }]
                // symbols: 'AAPL,MSFT',
                symbols: 'AAPL',
                // free plan only supports 12? 6?months of historic eod
                // so to get as much data as I can, can set the date_from one year ago
                date_from: '2024-02-26'
            }
        }
    )
        .then(response => {
            const data = response.data.data;
            // data.forEach((eod) => console.log(`
            //     exchange: ${eod.exchange}, symbol: ${eod.symbol}, price: ${eod.open}
            // `));
            console.log(data);
        });
}
