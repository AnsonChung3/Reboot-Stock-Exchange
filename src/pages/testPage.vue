<template>
<div>
    <div>{{ display }}</div>
    <div>
        <q-btn
            label="flick switch"
            @click="flickSwitch"
            outline
        />
        <q-btn
            disable
            label="clear local storage"
            @click="clearStorage"
            outline
        />
    </div>
</div>
</template>

<script>
// import { axios } from 'boot/axios.js';
// import { APIKEY } from 'components/APIKEY.js';
// import * as helpers from 'components/helpers.js'

export default {
    data () {
        return {
            display: 'text',
            var: false
        }
    },
    methods: {
        flickSwitch () {
            this.display = this.var;
            this.var = !this.var;
        },
        clearStorage () {
            localStorage.removeItem('game_data');
        }
    }
}
</script>
