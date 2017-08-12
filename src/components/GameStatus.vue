<template>
    <div class="game-status">
    
        <div v-if="gameState==='RUNNING'">
            {{currentTurn}}
        </div>
        <div v-if="gameState==='PLAYER_WIN'">
            You WIN!
        </div>
        <div v-if="gameState==='COMPUTER_WIN'">
            You lose, Computer wins.
        </div>
        <div v-if="gameState==='DRAW'">
            It's a draw.
        </div>
        <div v-if="gameState!=='RUNNING'">
            <b-button @click="newGame">New Game</b-button>
        </div>
    </div>
</template>

<script>
export default {

    computed: {
        gameState() {
            return this.$store.state.gameState;
        },
        currentTurn() {
            let { playerTurn, playerSymbol, computerSymbol } = this.$store.state;
            if (playerTurn) {
                return `Your turn (${playerSymbol})`;
            }
            return `Computers turn (${computerSymbol})`;
        }
    },
    methods: {
        newGame() {
            // so it looks like I don't even need mutations...
            this.$store.state.gameState = 'SETUP';
        }
    }

}
</script>

<style lang="scss" scoped>
.game-status {
    text-align: center;
    margin-bottom: 30px;
    position: absolute;
    top: -80px;
    left: 0;
    right: 0;
}

button {
    margin-top: 10px;
}
</style>
