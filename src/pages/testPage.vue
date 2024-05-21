<template>
<div>
    <div>{{ display }}</div>
    <div>
        <q-btn
            label=test
            @click="testReq"
            outline
        />
        <q-btn
            disable
            label="clear local storage"
            @click="clearStorage"
            outline
        />
    </div>
</div>
</template>

<script>
import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';
// import * as helpers from 'components/helpers.js'

export default {
    data () {
        return {
            display: 'text'
        }
    },
    methods: {
        testReq () {
            const array = ['AAPL', 'AL', 'MSFT'];
            const promises = [];
            for (let i = 1; i < array.length; i++) {
                promises.push(
                    axios.get('http://api.marketstack.com/v1/eod',
                        {
                            params: {
                                access_key: APIKEY,
                                symbols: array[i]
                            }
                        }
                    )
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                )
            }
            Promise.all(promises).then(() => {
                console.log('all requests resolved, store to local storage next');
            });
        },
        clearStorage () {
            localStorage.removeItem('game_data');
        }
    }
}
</script>
