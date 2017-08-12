export function checkWon(board, symbol) {
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === symbol &&
        board[i][1] === symbol &&
        board[i][2] === symbol) ||
      (board[0][i] === symbol &&
        board[1][i] === symbol &&
        board[2][i] === symbol)
    )
      return true;
  }
  //diags
  if (
    (board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
  )
    return true;
  return false;
}

export function checkGameDraw(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i].findIndex(cell => cell === null) > -1) return false;
  }
  return true;
}

// this alg is dumb
// simulate all possible moves and assign a score
// return random move from max scoring moves
export function findBestMoveComputer(board, computerSymbol) {
  let moveScores = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        let boardClone = cloneBoard(board);
        boardClone[row][col] = computerSymbol;
        moveScores.push({
          row,
          col,
          score: calcScore(boardClone, computerSymbol)
        });
      }
    }
  }

  // find max from moveScores
  let max = -1000;
  for (let i = 0; i < moveScores.length; i++) {
    max = Math.max(max, moveScores[i].score);
  }
  moveScores = moveScores.filter(ms => ms.score === max);
  let randomMove = moveScores[Math.floor(Math.random() * moveScores.length)];

  return {
    row: randomMove.row,
    col: randomMove.col
  };
}

function calcScore(board, computerSymbol) {
  if (checkGameDraw(board)) {
    return 0; //doesn't matter
  }
  if (checkWon(board, computerSymbol)) {
    return 10;
  }
  if (checkPlayerOneMoveFromWinningBoard(board, computerSymbol)) {
    return -10;
  }
  return 0;
}

function cloneBoard(board) {
  let ret = [[null, null, null], [null, null, null], [null, null, null]];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      ret[row][col] = board[row][col];
    }
  }
  return ret;
}

function checkPlayerOneMoveFromWinningBoard(board, computerSymbol) {
  let playerSymbol = computerSymbol === "X" ? "O" : "X";
  for (let i = 0; i < 3; i++) {
    if (
      checkPlayerOneMoveFromWinningRow(
        [board[i][0], board[i][1], board[i][2]],
        playerSymbol
      ) ||
      checkPlayerOneMoveFromWinningRow(
        [board[0][i], board[1][i], board[2][i]],
        playerSymbol
      )
    )
      return true;
  }
  // diagonals
  if (
    checkPlayerOneMoveFromWinningRow(
      [board[0][0], board[1][1], board[2][2]],
      playerSymbol
    ) ||
    checkPlayerOneMoveFromWinningRow(
      [board[0][2], board[1][1], board[2][0]],
      playerSymbol
    )
  ) {
    return true;
  }
  return false;
}

function checkPlayerOneMoveFromWinningRow(row, playerSymbol) {
  if (
    (row[0] === playerSymbol && row[1] === playerSymbol && row[2] === null) ||
    (row[0] === playerSymbol && row[1] === null && row[2] === playerSymbol) ||
    (row[0] === null && row[1] === playerSymbol && row[2] === playerSymbol)
  ) {
    return true;
  }
  return false;
}

export function getWinningCells(board) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== null &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    )
      return [{ row: i, col: 0 }, { row: i, col: 1 }, { row: i, col: 2 }];

    if (
      board[0][i] !== null &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    )
      return [{ row: 0, col: i }, { row: 1, col: i }, { row: 2, col: i }];
  }

  if (
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  )
    return [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }];

  if (
    board[0][2] !== null &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  )
    return [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }];

  // should never happen
  return [];
}
