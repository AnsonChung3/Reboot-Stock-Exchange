<template>
    <q-dialog>
        <q-card dark>
            <q-card-section class="text-center">Are you sure you want to proceed?</q-card-section>
            <q-card-actions align="center">
                <q-btn label="Cancel" v-close-popup />
                <q-btn label="Confirm" @click="emitConfirm" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    methods: {
        emitConfirm () {
            this.$emit('confirmed');
        }
    }
};
</script>
