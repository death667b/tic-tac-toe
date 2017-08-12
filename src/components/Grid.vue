<template>
    <div>
        <div class="grid-row">
            <app-cell class="no-left-border no-top-border" row="0" col="0"></app-cell>
            <app-cell class="no-top-border" row="0" col="1"></app-cell>
            <app-cell class="no-right-border no-top-border" row="0" col="2"></app-cell>
        </div>
        <div class="grid-row">
            <app-cell class="no-left-border" row="1" col="0"></app-cell>
            <app-cell row="1" col="1"></app-cell>
            <app-cell class="no-right-border" row="1" col="2"></app-cell>
        </div>
        <div class="grid-row">
            <app-cell class="no-left-border no-bottom-border" row="2" col="0"></app-cell>
            <app-cell class="no-bottom-border" row="2" col="1"></app-cell>
            <app-cell class="no-right-border no-bottom-border" row="2" col="2"></app-cell>
        </div>
    </div>
</template>

<script>
import Cell from './Cell.vue';
export default {
    components: {
        'app-cell': Cell
    },
    beforeMount() {
        if (!this.$store.state.playerTurn) {
            this.$store.dispatch('computerTakeTurn');
        }
    }
}
</script>

<style lang="scss">
.grid-row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.no-top-border {
    border-top: none !important;
}

.no-left-border {
    border-left: none !important;
}

.no-right-border {
    border-right: none !important;
}

.no-bottom-border {
    border-bottom: none !important;
}
</style>
