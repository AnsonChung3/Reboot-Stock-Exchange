<template>
<div>
    <div>{{ display }}</div>
    <div>
        <q-btn
            disable
            label="start test"
            @click="testInterval"
            outline
        />
        <q-btn
            disable
            label="flick switch"
            @click="flickSwitch"
            outline
        />
    </div>
    <div>
        <q-btn
            label="clear local storage"
            @click="clearStorage"
            outline
        />
        <q-btn
            label="populate from backup storage"
            @click="backupStorage"
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
            this.var = !this.var;
        },
        testInterval () {
            let count = 0;
            const isVar = () => {
                console.log(`interavl ${count}`);
                count++;
                if (this.var) {
                    console.log("now var is true");
                    clearInterval(intervalID);
                    this.mockEmit();
                }
            }
            const intervalID = setInterval(isVar, 1000);
            console.log("end of test");
        },
        mockEmit () {
            alert('emit start');
        },
        clearStorage () {
            localStorage.removeItem('game_data');
        },
        backupStorage () {
            localStorage.setItem('game_data', localStorage.getItem('backup_game_data'));
        }
    }
}
</script>
