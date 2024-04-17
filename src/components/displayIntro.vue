<template>
    <div>
        <h2>Introduction</h2>
        <div>
            <p>Thank you for trying out my personal project!</p>
            <p>You will be shown prices pulled from external API with real market data.</p>
            <p>The goal is to profit as much as possible within 14 trade days.</p>
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
};
</script>
