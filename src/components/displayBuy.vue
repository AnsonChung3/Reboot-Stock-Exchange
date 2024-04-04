<template>
    <div class="display-buy">
        <div class="stock-name">{{ stock.name }}</div>
        <div>Symbol: {{ stock.symbol }}</div>
        <div>Prices: {{ currentPrice/100 }}</div>
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
                labelTxt="buy"
                :disableCondition="!allowTrade"
                @click=buy
            />
            <trade-btn
                class="col"
                labelTxt="buy max"
                @click=test
            />
        </div>
    </div>
</template>

<script>
import TradeBtn from './tradeBtn.vue';

export default {
    props: {
        stock: Object
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
        funding () {
            return this.$store.state.game.playerAccount.funding;
        },
        allowTrade () {
            return this.tradeQty !== undefined && this.tradeQty > 0 && this.funding >= (this.tradeQty * this.stock.prices[this.currentCycle]);
        },
        tradeAmt () {
            return this.tradeQty === undefined ? 0 : (this.tradeQty * this.stock.prices[this.currentCycle]);
        },
        currentPrice () {
            return this.stock.prices[this.currentCycle];
        }
    },
    methods: {
        test () {
            console.log('test');
        },
        buy () {
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

<style scoped>
.display-buy {
    padding: 5%
}
.stock-name{
    font-size: 200%
}
</style>
