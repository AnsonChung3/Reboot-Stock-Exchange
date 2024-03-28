<template>
    <div>
        <h1>Game.vue</h1>
        <h2>Market</h2>
        <div v-for="stock in market" :key="stock.symbol">
            <display-buy :stock=stock></display-buy>
        </div>
        <q-btn
            label='next day'
            @click="incre"
            outline
        />
        <h2>Account</h2>
        <h3>Current Fund</h3>
        <div>{{ displayFunding }}</div>
        <h3>Holdings</h3>
        <div v-for="(holding, i) in holdings" :key="i">
            <display-sell :holding=holding></display-sell>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayBuy from 'components/displayBuy.vue';
import DisplaySell from 'components/displaySell.vue';

export default {
    components: {
        DisplaySell,
        DisplayBuy
    },
    watch: {
        currentCycle (newValue, oldValue) {
            if (newValue === this.lastPlayableCycle - 1) {
                alert('the next cycle is the last playable');
            } else if (newValue === this.lastPlayableCycle) {
                alert('this is the end of game, showing end screen next');
            }
        }
    },
    computed: {
        ...mapState({
            market: state => state.game.marketData,
            currentCycle: state => state.game.gameCycle,
            lastPlayableCycle: state => state.game.lastPlayableCycle,
            funding: state => state.game.playerAccount.funding,
            holdings: state => state.game.playerAccount.holdings
        }),
        displayFunding () {
            return (this.funding / 100).toFixed(2);
        }
    },
    methods: {
        incre () {
            this.$store.state.game.gameCycle += 1;
        }
    },
    created () {
        if (localStorage.getItem('game_data') === null) {
            // testing this one is bit expensive, use with caution
            console.log('datad not found, call to init data');
            this.$store.dispatch('game/initGameData');
        } else {
            console.log('game_data is in local storage');
            const data = JSON.parse(localStorage.getItem('game_data'));
            this.$store.commit('game/initGameMarket', { data });
        }
    }
}
</script>
