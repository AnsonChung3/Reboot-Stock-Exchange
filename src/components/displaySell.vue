<template>
    <div>
        <h4>Name: {{ holding.name }}</h4>
        <div>Symbol: {{ holding.symbol }}</div>
        <div>Holding quantity: {{ holding.quantity }}</div>
        <div>Current Price: {{ currentPrice/100 }}</div>
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
        currentPrice () {
            const stock = this.$store.state.game.marketData.find((stock) => stock.symbol === this.holding.symbol);
            const cycle = stock.startCycle + this.$store.state.game.gameCycle;
            return stock.prices[cycle];
        },
        tradeAmt () {
            return this.tradeQty * this.currentPrice;
        },
        enableSell () {
            return this.tradeQty > 0;
        }
    },
    methods: {
        sell () {
            // if (this.tradeQty <= 0 || this.tradeQty === undefined) {
            //     alert("Please input value greater than zero");
            //     return;
            // }
            // this.$store.dispatch('game/trade', {
            //     symbol: this.stock.symbol,
            //     tradeAmt: -this.tradeAmt,
            //     tradeQty: Number(this.tradeQty)
            // });
            console.log('sell');
        }
    }
}
</script>
