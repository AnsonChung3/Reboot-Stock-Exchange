<template>
    <div>
        <confirm-modal v-model="requestConfirm" @confirmed="buyMax"/>
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
                    @click="requestConfirm = !requestConfirm"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TradeBtn from './tradeBtn.vue';
import ConfirmModal from './confirmModal.vue';

export default {
    props: {
        stock: Object
    },
    components: {
        TradeBtn,
        ConfirmModal
    },
    data () {
        return {
            tradeQty: undefined,
            requestConfirm: false
        };
    },
    computed: {
        currentCycle () {
            return this.$store.getters['game/getCurrentCycle'];
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
        buyMax () {
            this.tradeQty = Math.floor(this.funding / this.currentPrice);
            this.buy();
        },
        buy () {
            this.$store.dispatch('game/trade', {
                name: this.stock.name,
                symbol: this.stock.symbol,
                tradeAmt: -this.tradeAmt,
                quantity: Number(this.tradeQty)
            });
            this.tradeQty = undefined;
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
