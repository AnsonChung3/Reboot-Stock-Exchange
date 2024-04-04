<template>
    <div>
        <h4>Name: {{ holding.name }}</h4>
        <div>Symbol: {{ holding.symbol }}</div>
        <div>Holding quantity: {{ holding.quantity }}</div>
        <div>Current Price: {{ currentPrice/100 }}</div>
        <div>Current Hold Value: {{ holdValue/100 }}</div>
        <q-input
            v-model="tradeQty"
            type="number"
            min=0
            placeholder="Trade Quantity"
            dark
        />
        <q-btn
            label="sell"
            @click="sell"
            outline
            :disabled="!enableSell"
        />
        <hr>
    </div>
</template>

<script>
export default {
    props: {
        holding: Object
    },
    data () {
        return {
            tradeQty: undefined
        };
    },
    computed: {
        currentCycle () {
            return this.$store.state.game.startCycle + this.$store.state.game.gameCycle;
        },
        currentPrice () {
            const stock = this.$store.state.game.marketData.find((stock) => stock.symbol === this.holding.symbol);
            return stock.prices[this.currentCycle];
        },
        tradeAmt () {
            return this.tradeQty * this.currentPrice;
        },
        enableSell () {
            return this.tradeQty > 0 && this.tradeQty <= this.holding.quantity;
        },
        holdValue () {
            return this.holding.quantity * this.currentPrice;
        }
    },
    methods: {
        sell () {
            this.$store.dispatch('game/trade', {
                symbol: this.holding.symbol,
                tradeAmt: this.tradeAmt,
                quantity: Number(-this.tradeQty)
            });
        }
    }
}
</script>
