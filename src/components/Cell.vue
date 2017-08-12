<template>
    <div :class="getCellClass">
        <div @click="cellClick" class="cell-click">
            <div>{{cellContents}}</div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import * as helpers from '../helpers';

export default {
    props: ['row', 'col'],
    computed: {
        ...mapGetters(['winningCells']),
        cellContents() {
            return this.$store.getters.board[this.row][this.col];
        },
        getCellClass() {
            // console.log('getCellClass', this.row, this.col);
            let isWinningCell = this.winningCells.filter(cell => {
                // console.log('filter', cell, this);
                // there was a bug with number types
                return cell.row == this.row && cell.col == this.col
            });
            // console.log('isWinningCell', isWinningCell);
            return `cell ${isWinningCell.length > 0 ? 'highlight' : ''}`;
        }
    },
    methods: {
        cellClick() {
            if (!this.$store.state.playerTurn) {
                return;
            }
            let row = this.row, col = this.col;
            if (this.$store.state.board[row][col] !== null) {
                alert("Please make move in empty cell.");
                return;
            }
            // the rest of this method should be put in action playerTakeTurn
            let symbol = this.$store.state.playerSymbol;
            // missing semicolon caused bug... how, i will never know
            this.$store.commit('UPDATE_CELL', { symbol, row, col });
            // check if won
            this.$store.dispatch('updateGameState');
            // this only works because updateGameState is synchronous
            if (this.$store.state.gameState === "RUNNING") {
                this.$store.dispatch('computerTakeTurn');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.highlight {
    color: red;
}

.cell {
    border: 1px solid black;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 8rem;
    .cell-click {
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
    }
}

@media (max-width: 600px) {
    .cell {
        width: 30vw;
        height: 30vw;
        font-size: 4rem;
    }
    .cell-click {
        width: 30vw;
        height: 30vw;
    }
}
</style>
