<template>
    <div>
        <h1>Game.vue</h1>
    </div>
</template>

<script>
export default {
    created () {
        if (localStorage.getItem('gameData') === null) {
            console.log('datad not found, call to init data');
        }
    }
}
</script>
