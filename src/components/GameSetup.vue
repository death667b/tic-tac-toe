<template>
    <div class="game-setup">
        <h1>Tic Tac Toe</h1>
        <h3>New Game Setup</h3>
        Choose your symbol:
        <br>
        <b-form-radio v-model="symbol" :options="symbolOptions"></b-form-radio>
        Who makes first move:
        <br>
        <b-form-radio v-model="firstTurn" :options="firstTurnOptions"></b-form-radio>
        <b-button @click="startGame">Start Game</b-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            symbol: "X",
            symbolOptions: [
                { text: "X", value: "X" },
                { text: "O", value: "O" }
            ],
            firstTurn: "player",
            firstTurnOptions: [
                { text: "You", value: "player" },
                { text: "Computer", value: "computer" }
            ]
        }
    },
    methods: {
        startGame() {
            this.$store.dispatch('startGame', {
                playerSymbol: this.symbol,
                playerFirst: this.firstTurn === 'player'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.game-setup {
    text-align: center;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

h3 {
    margin-bottom: 16px;
}

button {
    margin-top: 8px;
}
</style>
