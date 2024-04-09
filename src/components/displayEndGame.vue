<template>
    <div>
        <h2>End of game Report</h2>
            <div>Current Fund: {{ displayFunding }}</div>
            <div>Holdings value: {{ displayValHolding }}</div>
            <hr>
            <div>Total Value: {{ displayTotalValue }}</div>
            <div>Your starting fund was 100,000</div>
            <div>You have earned/lost [ this much money ]</div>
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
        funding () {
            return this.$store.state.game.playerAccount.funding;
        },
        displayFunding () {
            return (this.funding / 100).toFixed(2);
        },
        displayValHolding () {
            // returns a string for display
            const val = this.$store.getters['game/getTotalHoldingValue'];
            return (val / 100).toFixed(2);
        },
        displayTotalValue () {
            const val = this.$store.getters['game/getTotalHoldingValue'] + this.funding;
            return (val / 100).toFixed(2);
        }
    },
    methods: {
        emitRestart () {
            this.$emit('restart');
        }
    }
}
</script>
