<template>
    <div>
        <h1>Place Holder - Stock Exchange</h1>
        <p>{{ test }}</p>
        <p>{{ market }}</p>
        <q-btn
            label='getTickers'
            @click="getTicker"
            outline
        />
        <q-btn
            label="next day"
            @click="day++"
            outline
        />
        <div v-for="(stock, i) in market" :key="i">
            symbol: {{ market[i].symbol }}, price: {{ market[i].priceHistory[day] }}
        </div>
        <p> input amount <span><q-input v-model="amount"/></span></p>
        <p>{{ sufficient }}</p>
    </div>
</template>

<script>
// import * as data from 'src/components/PropData.js';
// import { axios } from 'boot/axios.js';
// import { APIKEY } from 'components/APIKEY.js';
// import * as helpers from 'components/helpers.js';
import * as helpers from 'components/helpers.js';
import { mapState } from 'vuex';

export default {
    data () {
        return {
            day: 0,
            amount: 0
        };
    },
    computed: {
        ...mapState({
            test: state => state.game.test,
            market: state => state.game.marketData,
            funding: state => state.game.playerData.funding,
            player: state => state.game.playerData
        }),
        price () {
            return this.market[0].priceHistory[this.day];
        },
        sufficient () {
            return this.funding > (this.amount * this.price) ? "enough" : "not enough";
        }
    },
    methods: {
        getTicker () {
            helpers.getTickers();
        },
        initProject () {
            console.log('init project');
            // helpers.prototypeInitStore();
            this.prototypeInitStore();
        },
        prototypeInitStore () {
            const AAPL = JSON.parse(localStorage.getItem('AAPL_Price_data'));
            const MSFT = JSON.parse(localStorage.getItem('MSFT_Price_data'));
            this.$store.commit('game/addToMarket', { symbol: 'AAPL', priceHistory: AAPL });
            this.$store.commit('game/addToMarket', { symbol: 'MSFT', priceHistory: MSFT });
        }
    },
    created () {
        this.initProject();
    }
};
</script>
