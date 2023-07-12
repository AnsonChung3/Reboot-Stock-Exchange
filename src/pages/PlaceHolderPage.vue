<template>
    <div>
        <h1>Place Holder - Stock Exchange</h1>
        <q-btn
            label='testLocalStorage'
            @click="testLocalStorage"
            outline
        />
        <q-btn
            label='test axios'
            @click="testAPI"
            outline
        />
        <p>{{ testCacheData }}</p>
        <p>{{ test }}</p>
        <p>{{ array }}</p>
    </div>
</template>

<script>
import * as data from 'src/components/PropData.js';
import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';

export default {
    data () {
        return {
            array: data.arrayData,
            testCacheData: data.data[0].open
        };
    },
    computed: {
        test () {
            return data.numData + 1;
        }
    },
    methods: {
        testLocalStorage () {
            const array = JSON.parse(localStorage.getItem('AAPL2022EodPrices'));
            console.log(array.length);
            const filter = [];
            for (let i = 0; i < array.length; i += 9) {
                filter.push(array[i].open);
            }
            console.log(filter);
        },
        },
        testAPI () {
            axios.get('http://api.marketstack.com/v1/eod',
                {
                    params: {
                        access_key: APIKEY,
                        // request count is on tickers,
                        // so 1 eod/latest for 2 tickers, counts as 2 requests
                        // but 2 days of eod for 1 ticker, counts as 1 request
                        // symbols: 'AAPL, MSFT',
                        symbols: 'AAPL',
                        date_from: '2022-01-01',
                        date_to: '2022-12-31',
                        limit: 1000
                    }
                }
            )
                .then(response => {
                    localStorage.setItem('AAPL2022EodPrices', JSON.stringify(response.data.data));
                });
        }
    }
};
</script>
