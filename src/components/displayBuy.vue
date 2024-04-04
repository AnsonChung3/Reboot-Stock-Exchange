<template>
    <div>
        <div>Name: {{ stock.name }}</div>
        <div>Symbol: {{ stock.symbol }}</div>
        <div>Prices: {{ currentPrice/100 }}</div>
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
        currentCycle () {
            return this.$store.state.game.startCycle + this.$store.state.game.gameCycle;
        },
        funding () {
            return this.$store.state.game.playerAccount.funding;
        },
        sufficientFund () {
            return this.tradeQty !== undefined && this.funding >= (this.tradeQty * this.stock.prices[this.currentCycle]);
        },
        tradeAmt () {
            return this.tradeQty === undefined ? 0 : (this.tradeQty * this.stock.prices[this.currentCycle]);
        },
        currentPrice () {
            return this.stock.prices[this.currentCycle];
        }
    },
    methods: {
        buy () {
            if (this.tradeQty <= 0 || this.tradeQty === undefined) {
                alert("Please input value greater than zero");
                return;
            }
            this.$store.dispatch('game/trade', {
                name: this.stock.name,
                symbol: this.stock.symbol,
                tradeAmt: -this.tradeAmt,
                quantity: Number(this.tradeQty)
            });
        }
    }
}
</script>
