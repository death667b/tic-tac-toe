import Vue from "vue";
import Vuex from "vuex";

import * as helpers from "../helpers";

Vue.use(Vuex);

const board = [[null, null, null], [null, null, null], [null, null, null]];

const state = {
  board,
  playerSymbol: "X",
  computerSymbol: "O",
  playerTurn: false,
  gameState: "SETUP",
  winningCells: []
};

const mutations = {
  UPDATE_CELL(state, { symbol, row, col }) {
    state.board[row].splice(col, 1, symbol);
  },
  INIT_BOARD(state) {
    state.board = [[null, null, null], [null, null, null], [null, null, null]];
  },
  INIT_GAME(state, { playerSymbol, computerSymbol, playerTurn }) {
    state.gameState = "RUNNING";
    state.winningCells = [];
    state.playerSymbol = playerSymbol;
    state.computerSymbol = computerSymbol;
    state.playerTurn = playerTurn;
  },
  SET_PLAYER_TURN(state) {
    state.playerTurn = true;
  },
  SET_COMPUTER_TURN(state) {
    state.playerTurn = false;
  },
  SET_GAME_STATE(state, gameState) {
    state.gameState = gameState;
  },
  SET_WINNING_CELLS(state, winningCells) {
    state.winningCells = winningCells;
  }
};

const actions = {
  startGame({ commit }, { playerSymbol, playerFirst }) {
    commit("INIT_BOARD");
    let computerSymbol = playerSymbol === "X" ? "O" : "X";
    commit("INIT_GAME", {
      playerSymbol,
      computerSymbol,
      playerTurn: playerFirst
    });
  },

  computerTakeTurn(context) {
    context.commit("SET_COMPUTER_TURN");
    let updateCell = (row, col) => {
      setTimeout(() => {
        context.commit("UPDATE_CELL", {
          symbol: context.state.computerSymbol,
          row,
          col
        });
        context.dispatch("updateGameState");
      }, 1300);
    };

    // TODO this alg will need to be fixed
    // for (let row = 0; row < 3; row++) {
    //   for (let col = 0; col < 3; col++) {
    //     if (context.state.board[row][col] === null) {
    //       updateCell(row, col);
    //       return;
    //     }
    //   }
    // }

    let { board, computerSymbol } = context.state;
    let { row, col } = helpers.findBestMoveComputer(board, computerSymbol);
    updateCell(row, col);
  },
  highlightWinningStreak(context) {
    let winningCells = helpers.getWinningCells(context.state.board);
    context.commit("SET_WINNING_CELLS", winningCells);
  },
  updateGameState(context) {
    let { board, computerSymbol, playerSymbol, playerTurn } = context.state;
    if (helpers.checkWon(board, playerTurn ? playerSymbol : computerSymbol)) {
      context.commit(
        "SET_GAME_STATE",
        playerTurn ? "PLAYER_WIN" : "COMPUTER_WIN"
      );
      //
      context.dispatch("highlightWinningStreak");

      return;
    } else if (helpers.checkGameDraw(board)) {
      context.commit("SET_GAME_STATE", "DRAW");
      return;
    }
    if (playerTurn) {
      context.commit("SET_COMPUTER_TURN");
    } else {
      context.commit("SET_PLAYER_TURN");
    }
  }
};

// TODO do i even need this...
const getters = {
  board: state => state.board,
  winningCells: state => state.winningCells
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
