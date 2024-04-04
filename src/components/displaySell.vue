<template>
    <div class="display-sell">
        <div class="stock-name">{{ holding.name }}</div>
        <div>Symbol: {{ holding.symbol }}</div>
        <div>Holding quantity: {{ holding.quantity }}</div>
        <div>Current Price: {{ currentPrice/100 }}</div>
        <div>Current Hold Value: {{ holdValue/100 }}</div>
        <div class=row>
            <q-input
                class="col-5"
                v-model="tradeQty"
                type="number"
                placeholder="Trade Quantity"
                dark
            />
            <trade-btn
                class="col"
                labelTxt="sell"
                :disableCondition="!enableSell"
                @click=buy
            />
            <trade-btn
                class="col"
                labelTxt="sell all"
            />
        </div>
    </div>
</template>

<script>
import TradeBtn from './tradeBtn.vue';

export default {
    props: {
        holding: Object
    },
    components: {
        TradeBtn
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

<style scoped>
.display-sell {
    padding: 5%
}
.stock-name{
    font-size: 200%
}
</style>
