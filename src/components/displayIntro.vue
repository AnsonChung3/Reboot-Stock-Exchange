<template>
    <div>
        <h2>Introduction</h2>
        <div v-if="page === 0">
            <p>Thank you for trying out my personal project!</p>
            <p>You will be shown prices pulled from an external API with real market data.</p>
            <p>The goal is to profit as much as possible within 14 trade days.</p>
            <br>
            <q-btn
                label="next"
                @click="page++"
                outline
            />
        </div>
        <div v-if="page === 1 && !hasData">
            <p>Before you start, please go to <a :href="url">marketstack</a>.</p>
            <p>You can register for a free account for an API key. It is necessary for procceding the game.</p>
            <p>Put your API key in the input box below:</p>
            <q-input
                type="text"
                v-model="customerKey"
                outlined
                dark
            />
            <q-btn
                label="request data"
                @click="addKeyReqData"
                outline
            />
        </div>
        <div v-if="page === 2">
            <p>The game will fetch the price data for a total of 10 stocks.</p>
            <p>4 stocks will be randomly chosen for each game.</p>
            <p>The returned data from the API will be stored in local storage. You can see it under the "Application" tab if you go to your browser dev tools.</p>
            <p>Time for a little game!</p>
            <p><b>Http requests may take a few seconds to resolve due to rate limit. You will be automatically taken to the game when it's ready.</b></p>
            <q-btn
                label="Start trading"
                @click="emitStart"
                outline
            />
        </div>
        <div v-if="page === 1 && hasData">
            <p>There are already data stored to your browser. You can start game with existing data or fetch new data.</p>
            <p><b>Note: data from the API are end of day data. Fetching new data in the same day won't give you different results as the list of 10 stocks is fixed. Each initiation of data will cost 11 API requests.</b></p>
            <q-btn
                label="fetch new"
                @click="fetchNew"
                outline
            />
            <q-btn
                label="Start trading"
                @click="emitStart"
                outline
            />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            page: 0,
            url: 'https://marketstack.com/',
            customerKey: undefined,
            hasData: false
        }
    },
    watch: {
        validKey (newValue) {
            if (newValue === false) {
                alert('Please check your API key or the remaining number of http request and refresh the page.');
            }
        }
    },
    computed: {
        validKey () {
            return this.$store.state.game.validKey;
        },
        validData () {
            return this.$store.state.game.validData;
        }
    },
    methods: {
        emitStart () {
            if (this.hasData) {
                this.$emit('startGame');
                return;
            }
            const isDataReady = () => {
                if (this.validData) {
                    clearInterval(intervalID);
                    this.$emit('startGame');
                }
            }
            const intervalID = setInterval(isDataReady, 500);
        },
        fetchNew () {
            this.hasData = false;
            localStorage.removeItem('game_data');
        },
        addKeyReqData () {
            const key = this.customerKey;
            if (key === undefined || key === '') {
                alert('Please input an API key to continue.');
                return;
            }
            this.$store.dispatch('game/initGameData', key);
            this.customerKey = undefined;
            this.page++;
        }
    },
    created () {
        if (localStorage.getItem('game_data') !== null) {
            this.hasData = true;
            const data = JSON.parse(localStorage.getItem('game_data'));
            this.$store.commit('game/initGameMarket', { data });
        }
    }
};
</script>
