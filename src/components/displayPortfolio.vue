<template>
    <div>
        <div v-for="(holding, i) in holdings" :key="i">
            <display-sell :holding=holding></display-sell>
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
        }
    }
}
</script>
