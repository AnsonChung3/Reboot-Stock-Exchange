<template>
    <div>
        <h1>Place Holder - Stock Exchange</h1>
        <q-btn
            label='init Project'
            @click="initProject"
            outline
        />
    </div>
</template>

<script>
// import * as data from 'src/components/PropData.js';
// import { axios } from 'boot/axios.js';
// import { APIKEY } from 'components/APIKEY.js';
import * as helpers from 'components/helpers.js';

export default {
    data () {
        return {
        };
    },
    methods: {
        initProject () {
            console.log('init project');
            helpers.prototypeInit();
        }
    }
};
</script>
