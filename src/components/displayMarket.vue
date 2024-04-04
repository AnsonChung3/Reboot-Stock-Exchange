<template>
    <div>
        <div v-for="stock in market" :key="stock.symbol">
            <display-buy :stock=stock></display-buy>
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
        }
    }
}
</script>
