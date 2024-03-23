<template>
    <div>
        <div>Name: {{ stock.name }}</div>
        <div>Symbol: {{ stock.symbol }}</div>
        <div>Prices: {{ stock.prices[currentCycle]/100 }}</div>
        <div>Start Cycle: {{ startCycle }}</div>
        <div>Current Cycle: {{ currentCycle }}</div>
        <q-input
            v-model="tradeQty"
            type="number"
            min=0
            placeholder="Trade Quantity"
            dark
        />
        <q-btn
            label="buy"
            @click="buy"
            outline
            :disabled="!sufficientFund"
        />
        <hr>
    </div>
</template>

<script>
export default {
    props: {
        stock: Object
    },
    data () {
        return {
            tradeQty: undefined
        };
    },
    computed: {
        startCycle () {
            return this.stock.prices === undefined ? 0 : (this.stock.prices.length - (this.$store.state.game.lastPlayableCycle + 1));
        },
        currentCycle () {
            return this.startCycle + this.$store.state.game.gameCycle;
        },
        funding () {
            return this.$store.state.game.playerAccount.funding;
        },
        sufficientFund () {
            return this.tradeQty !== undefined && this.funding >= (this.tradeQty * this.stock.prices[this.currentCycle]);
        },
        tradeAmt () {
            return this.tradeQty === undefined ? 0 : (this.tradeQty * this.stock.prices[this.currentCycle]);
        }
    },
    methods: {
        buy () {
            if (this.tradeQty <= 0 || this.tradeQty === undefined) {
                alert("Please input value greater than zero");
                return;
            }
            this.$store.dispatch('game/trade', {
                symbol: this.stock.symbol,
                tradeAmt: -this.tradeAmt,
                tradeQty: Number(this.tradeQty)
            });
        }
    }
}
</script>
