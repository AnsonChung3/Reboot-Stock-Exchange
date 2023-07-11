<template>
    <div>
        <h1>Place Holder - Stock Exchange</h1>
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
        testAPI () {
            axios.get('http://api.marketstack.com/v1/eod/latest',
                {
                    params: {
                        access_key: APIKEY,
                        symbols: 'AAPL'
                    }
                }
            )
                .then(response => {
                    console.log(response.data);
                })
        }
    }
};
</script>
