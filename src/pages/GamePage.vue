<template>
    <div>
        <h1>Game.vue</h1>
        <div v-for="stock in market" :key="stock.symbol">
            <display-card :stock=stock></display-card>
        </div>
        <q-btn
            label='next day'
            @click="incre"
            outline
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayCard from 'components/displayCard.vue';

export default {
    components: {
        DisplayCard
    },
    watch: {
        currentCycle (newValue, oldValue) {
            if (newValue === this.lastPlayCycle - 1) {
                alert('the next cycle is the last playable');
            } else if (newValue === this.lastPlayCycle) {
                alert('this is the end of game, showing end screen next');
            }
        }
    },
    computed: {
        ...mapState({
            market: state => state.game.marketData,
            currentCycle: state => state.game.gameCycle,
            lastPlayCycle: state => state.game.lastPlayCycle
        })
    },
    methods: {
        incre () {
            this.$store.state.game.gameCycle += 1;
        }
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
