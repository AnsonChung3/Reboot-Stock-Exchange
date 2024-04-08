<template>
    <div>
        <confirm-modal v-model="requestConfirm" @confirmTrade="confirmEndGame"></confirm-modal>
        <h1>Game.vue</h1>
        <div v-if="tab === ''">
            <h2>Welcome to Game</h2>
            <q-btn
                label="press to start"
                @click="tab = 'market'"
                outline
            />
        </div>
        <div v-else-if="tab === 'endGameScreen'">
            <div>I am end game screen</div>
            <q-btn
                label="press to start"
                @click="startNewgame"
                outline
            />
        </div>
        <div v-else>
            <div class="row">
                <div class="col-7">
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
                <div class="col"></div>
                <div class="col">
                    <div>Holdings</div>
                    <div>{{ displayValHolding }}</div>
                </div>
                <div class="col">+</div>
                <div class="col">
                    <div>Current Fund</div>
                    <div>{{ displayFunding }}</div>
                </div>
                <div class="col">=</div>
                <div class="col">
                    <div>Total Value</div>
                    <div>{{ displayTotalValue }}</div>
                </div>
            </div>
            <div>
                <q-tab-panels v-model="tab" keep-alive dark>
                    <q-tab-panel name="portfolio">
                        <display-portfolio></display-portfolio>
                    </q-tab-panel>
                    <q-tab-panel name="market">
                        <display-market></display-market>
                    </q-tab-panel>
                </q-tab-panels>
                <q-btn
                    label='next day'
                    @click="nextDay"
                    outline
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayMarket from 'components/displayMarket.vue';
import DisplayPortfolio from 'components/displayPortfolio.vue';
import ConfirmModal from 'components/confirmModal.vue';

export default {
    components: {
        DisplayMarket,
        DisplayPortfolio,
        ConfirmModal
    },
    data () {
        return {
            tab: '',
            requestConfirm: false
        }
    },
    watch: {
        gameCycle (newValue) {
            if (newValue === this.lastPlayableCycle - 1) {
                alert('the next cycle is the last playable');
            } else if (newValue === this.lastPlayableCycle) {
                // possibly change this to modal, with cancel/confirm
                // alert('this is the end of game, showing end screen next');
                this.requestConfirm = !this.requestConfirm;
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
        currentCycle () {
            return this.$store.getters['game/getCurrentCycle'];
        },
        displayFunding () {
            return (this.funding / 100).toFixed(2);
        },
        displayValHolding () {
            let totalValue = 0;
            if (this.holdings.length === 0) {
                return totalValue;
            }
            for (let i = 0; i < this.holdings.length; i++) {
                const stock = this.market.find((stock) => stock.symbol === this.holdings[i].symbol);
                const price = stock.prices[this.currentCycle];
                totalValue += (this.holdings[i].quantity * price);
            }
            return (totalValue / 100).toFixed(2);
        },
        displayTotalValue () {
            return (Number(this.displayFunding) + Number(this.displayValHolding)).toFixed(2);
        }
    },
    methods: {
        nextDay () {
            this.$store.commit('game/nextDay');
        },
        confirmEndGame () {
            this.tab = 'endGameScreen';
        },
        startNewgame () {
            this.$store.commit('game/resetGame');
            this.tab = 'market';
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
