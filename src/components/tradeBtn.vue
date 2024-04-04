<template>
    <q-btn
        :label=labelTxt
        :disable=disableCondition
        outline
        style="margin: 5%"
    />
</template>

<script>
export default {
    props: {
        labelTxt: String,
        disableCondition: Boolean
    }
}
</script>
