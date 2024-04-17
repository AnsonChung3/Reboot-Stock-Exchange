<template>
    <div>
        <h2>End of game Report</h2>
        <div class="display-block">
            <div>Current Fund: {{ displayFunding }}</div>
            <div>Holdings value: {{ displayValHolding }}</div>
        </div>
        <hr>
        <div class="display-block">
            <div>The combined value for your current funding and stock is {{ displayTotalValue }}</div>
            <div>Your starting fund was 100000.00</div>
            <div>{{ reportText }}</div>
        </div>
        <q-btn
            label="press to start"
            @click="emitRestart"
            outline
        />
    </div>
</template>

<script>
export default {
    computed: {
        totalAccountValue () {
            // kept for code readability
            return this.$store.getters['game/getTotalHoldingValue'] + this.$store.state.game.playerAccount.funding;
        },
        // all 4 properties below return a string
        displayFunding () {
            return (this.$store.state.game.playerAccount.funding / 100).toFixed(2);
        },
        displayValHolding () {
            const val = this.$store.getters['game/getTotalHoldingValue'];
            return (val / 100).toFixed(2);
        },
        displayTotalValue () {
            return (this.totalAccountValue / 100).toFixed(2);
        },
        reportText () {
            const difference = this.totalAccountValue - (100000 * 100);
            const val = Math.abs(difference / 100);
            const displayVal = val.toFixed(2);
            const text = (difference >= 0) ? 'earned' : 'lost';
            return `You have ${text} $${displayVal}`;
        }
    },
    methods: {
        emitRestart () {
            this.$emit('restart');
        }
    }
};
</script>

<style scoped>
.display-block {
    margin: 2% 0% 2% 0%
}
</style>
