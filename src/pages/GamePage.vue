<template>
    <div>
        <confirm-modal v-model="requestConfirm" @confirmed="confirmEndGame"></confirm-modal>
        <h1>Stock Exchange Game</h1>
        <div v-if="tab === ''">
            <h2>Welcome!</h2>
            <q-btn
                label="click me"
                @click="tab = 'introScreen'"
                outline
            />
        </div>
        <div v-else-if="tab === 'introScreen'">
            <display-intro @startGame="showMarket" />
        </div>
        <div v-else-if="tab === 'endGameScreen'">
            <display-end-game @restart="startNewgame"/>
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
import ConfirmModal from 'components/confirmModal.vue';
import DisplayIntro from 'components/displayIntro.vue';
import DisplayEndGame from 'components/displayEndGame.vue';
import DisplayMarket from 'components/displayMarket.vue';
import DisplayPortfolio from 'components/displayPortfolio.vue';

export default {
    components: {
        ConfirmModal,
        DisplayIntro,
        DisplayEndGame,
        DisplayMarket,
        DisplayPortfolio
    },
    data () {
        return {
            tab: '',
            requestConfirm: false,
            endGameConfirm: false
        }
    },
    watch: {
        gameCycle (newValue) {
            if (newValue === this.lastPlayableCycle - 1) {
                alert('the next cycle is the last playable');
            } else if (newValue === this.lastPlayableCycle) {
                this.requestConfirm = !this.requestConfirm;
            }
        }
    },
    computed: {
        ...mapState({
            gameCycle: state => state.game.gameCycle,
            lastPlayableCycle: state => state.game.lastPlayableCycle,
            funding: state => state.game.playerAccount.funding
        }),
        // all 3 properties blow returns a string
        displayValHolding () {
            const val = this.$store.getters['game/getTotalHoldingValue'];
            return (val / 100).toFixed(2);
        },
        displayFunding () {
            return (this.funding / 100).toFixed(2);
        },
        displayTotalValue () {
            const val = this.$store.getters['game/getTotalHoldingValue'] + this.funding;
            return (val / 100).toFixed(2);
        }
    },
    methods: {
        nextDay () {
            if (this.gameCycle === this.lastPlayableCycle - 1) {
                this.endGameConfirm ? this.$store.commit('game/nextDay') : this.requestConfirm = true;
            } else if (this.gameCycle < this.lastPlayableCycle) {
                this.$store.commit('game/nextDay');
            }
        },
        confirmEndGame () {
            this.tab = 'endGameScreen';
            this.endGameConfirm = true;
            this.nextDay();
        },
        showMarket () {
            this.tab = 'market';
        },
        startNewgame () {
            console.log('start new game');
            this.$store.commit('game/setStartCycle', this.$store.getters['game/getStartCycle']);
            this.$store.commit('game/resetGame');
            this.endGameConfirm = false;
            this.showMarket();
        }
    },
    created () {
        if (localStorage.getItem('game_data') === null) {
            this.$store.dispatch('game/initGameData');
        } else {
            console.log('created, else');
            this.$store.commit('game/setStartCycle', this.$store.getters['game/getStartCycle']);
            const data = JSON.parse(localStorage.getItem('game_data'));
            this.$store.commit('game/initGameMarket', { data });
            // this.$store.dispatch('game/resetGame');
        }
    }
}
</script>
