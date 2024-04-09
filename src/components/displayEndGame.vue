<template>
    <div>
        <h2>End of game Report</h2>
            <div>Current Fund: {{ displayFunding }}</div>
            <div>Holdings value: {{ displayValHolding }}</div>
            <hr>
            <div>Total Value: {{ displayTotalValue }}</div>
            <div>Your starting fund was 100,000</div>
            <div>You have earned/lost [ this much money ]</div>
            <q-btn
                label="press to start"
                @click="emitRestart"
                outline
            />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            market: state => state.game.marketData,
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
        emitRestart () {
            this.$emit('restart');
        }
    }
}
</script>
