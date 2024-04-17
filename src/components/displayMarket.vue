<template>
    <div>
        <div class="row" v-for="(row, index) in rowedMarket" :key="index">
            <div class="col" v-for="stock in row" :key="stock.symbol">
                <display-buy :stock=stock></display-buy>
            </div>
        </div>
    </div>
</template>

<script>
import DisplayBuy from 'components/displayBuy.vue';

export default {
    components: {
        DisplayBuy
    },
    computed: {
        market () {
            return this.$store.state.game.marketData;
        },
        rowedMarket () {
            const rowedMarket = [];
            for (let i = 0; i < this.market.length; i += 2) {
                rowedMarket.push([this.market[i], this.market[i + 1]]);
            }
            return rowedMarket;
        }
    }
};
</script>
