<template>
    <div>
        <h1>Place Holder - Stock Exchange</h1>
        <p>{{ test }}</p>
        <p>{{ array }}</p>
    </div>
</template>

<script>
import * as data from 'src/components/PropData.js';

export default {
    data () {
        return {
            array: data.arrayData
        }
    },
    computed: {
        test () {
            return data.numData + 1;
        }
        // array () {
        //     return data.arrayData;
        // }
    }
};
</script>
