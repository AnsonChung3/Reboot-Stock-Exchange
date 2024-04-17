<template>
    <div>
        <div class="row" v-for="(row, index) in rowedHoldings" :key="index">
            <div class="col-6" v-for="(holding, i) in row" :key="i">
                <display-sell :holding=holding></display-sell>
            </div>
        </div>
    </div>
</template>

<script>
import DisplaySell from 'components/displaySell.vue';

export default {
    components: {
        DisplaySell
    },
    computed: {
        holdings () {
            return this.$store.state.game.playerAccount.holdings;
        },
        rowedHoldings () {
            const rowedHoldings = [];
            for (let i = 0; i < this.holdings.length; i += 2) {
                const pair = [this.holdings[i]];
                if (i + 1 < this.holdings.length) {
                    pair.push(this.holdings[i + 1]);
                }
                rowedHoldings.push(pair);
            }
            return rowedHoldings;
        }
    }
};
</script>
