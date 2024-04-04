<template>
    <div>
        <h1>Game.vue</h1>
        <div class="tabsToggleBar row">
            <div class="tabsBarNegative col"></div>
            <div class="tabsBar col-7">
                <q-tabs
                    v-model="tab"
                    dense
                    align="justify"
                    narrow-indicator
                >
                    <q-tab name="market" label="Market" />
                    <q-tab name="portfolio" label="Portfolio" />
                </q-tabs>
            </div>
            <div class="tabsBarNegative col"></div>
            <div class="tabAcValue col">
                <div>Current Fund</div>
                <div>{{ displayFunding }}</div>
            </div>
        </div>
        <div v-show="tab !== ''">
            <q-tab-panels v-model="tab" keep-alive dark>
                <q-tab-panel class="stockPanelDisplay" name="portfolio">
                    <display-portfolio></display-portfolio>
                </q-tab-panel>
                <q-tab-panel class="stockPanelDisplay" name="market">
                    <display-market></display-market>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <q-btn
            label='next day'
            @click="incre"
            outline
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayMarket from 'components/displayMarket.vue';
import DisplayPortfolio from 'components/displayPortfolio.vue';

export default {
    components: {
        DisplayMarket,
        DisplayPortfolio
    },
    data () {
        return {
            tab: ''
        }
    },
    watch: {
        gameCycle (newValue, oldValue) {
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
            gameCycle: state => state.game.gameCycle,
            lastPlayableCycle: state => state.game.lastPlayableCycle,
            funding: state => state.game.playerAccount.funding,
            holdings: state => state.game.playerAccount.holdings
        }),
        displayFunding () {
            return (this.funding / 100).toFixed(2);
        },
        currentCycle () {
            return this.$store.state.game.startCycle + this.$store.state.game.gameCycle;
        },
        valueofHolding () {
            let totalValue = 0;
            if (this.holdings.length === 0) {
                return totalValue;
            }
            for (let i = 0; i < this.holdings.length; i++) {
                const stock = this.market.find((stock) => stock.symbol === this.holdings[i].symbol);
                const price = stock.prices[this.currentCycle];
                totalValue += (this.holdings[i].quantity * price);
            }
            return totalValue;
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
