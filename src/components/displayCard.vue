<template>
    <div>
        <div>Name: {{ stock.name }}</div>
        <div>Symbol: {{ stock.symbol }}</div>
        <div>Prices: {{ stock.prices }}</div>
        <hr>
    </div>
</template>

<script>
export default {
    props: {
        stock: Object
    }
}
</script>
