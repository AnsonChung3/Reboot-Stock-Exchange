<template>
    <div>
        <h1>Place Holder - Stock Exchange</h1>
        <q-btn
            label='init Project'
            @click="initProject"
            outline
        />
    </div>
</template>

<script>
// import * as data from 'src/components/PropData.js';
import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';

export default {
    data () {
        return {
        };
    },
    methods: {
        initProject () {
            console.log('init project');
            this.callDataFromAPI();
        },
        callDataFromAPI () {
            axios.get('http://api.marketstack.com/v1/eod',
                {
                    params: {
                        access_key: APIKEY,
                        // request count is on tickers,
                        // so 1 eod/latest for 2 tickers, counts as 2 requests
                        // but 2 days of eod for 1 ticker, counts as 1 request
                        // symbols: 'AAPL, MSFT',
                        symbols: 'AAPL',
                        // free plan only supports 12? 6?months of historic eod
                        // so to get as much data as I can, can set the date_from one year ago
                        // for my little project, it can be hard coded as is
                        date_from: '2024-02-26',
                        limit: 1000
                    }
                }
            )
                .then(response => {
                    const data = response.data.data;
                    data.forEach((eod) => console.log(`
                        exchange: ${eod.exchange}, symbol: ${eod.symbol}, price: ${eod.open}
                    `));
                });
        }
    }
};
</script>
