<template>
    <div>
        <h2>Welcome To game!</h2>
        <div>
            <p>You will be shown price pulled from external API with rael market data.</p>
            <p>The goal is to get as much profit as possible within 14 trade days.</p>
        </div>
        <q-btn
            label="Start trading"
            @click="emitStart"
            outline
        />
    </div>
</template>

<script>
export default {
    methods: {
        emitStart () {
            this.$emit('startGame');
        }
    }
}
</script>
