<template>
    <div>
        <div>Name: {{ stock.name }}</div>
        <div>Symbol: {{ stock.symbol }}</div>
        <div>Prices: {{ stock.prices }}</div>
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
            if (this.stock.prices != null) {
                // return Math.floor(Math.random() * this.stock.prices.length - 10);
                return this.stock.prices.length - (this.$store.state.game.lastPlayableCycle + 1);
            } else {
                // else block is useful when dev data only consists prices for 2/4 stocks
                // to save some API requests
                return 0;
            }
        },
        currentCycle () {
            return this.startCycle + this.$store.state.game.gameCycle;
        }
    },
    methods: {
        buy () {
            if (this.tradeQty <= 0 || this.tradeQty === undefined) {
                alert("Please input value greater than zero");
                return;
            }
            // btn disabled if not enough funding
            console.log(`trade qty is ${this.tradeQty}, price is ${this.stock.prices[this.currentCycle]}`);
        }
    }
}
</script>
