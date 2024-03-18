<template>
    <div>
        <h1>Game.vue</h1>
        <div v-for="stock in market" :key="stock.symbol">
            <display-card :stock=stock></display-card>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayCard from 'components/displayCard.vue';

export default {
    components: {
        DisplayCard
    },
    computed: {
        ...mapState({
            market: state => state.game.marketData
        })
    },
    created () {
        if (localStorage.getItem('game_data') === null) {
            // testing this one is bit expensive, use with caution
            console.log('datad not found, call to init data');
            this.$store.dispatch('game/initGameData');
        } else {
            console.log('game_data is not null');
            const data = JSON.parse(localStorage.getItem('game_data'));
            console.log(data);
            this.$store.commit('game/initGameMarket', { data });
        }
    }
}
</script>
