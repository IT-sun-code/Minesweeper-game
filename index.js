const gameField = document.querySelector(".game__field");

const numOfCols = 16;
const numOfRows = 16;
const numOfMines = 40;
let numOfFlagged = 0;
let numOfQuestioned = 0;
let numOfRevealed = 0;
let squares = [];
let counter = 40;
let gameEnded = false;
let hasWon = "";
let timer = null;

// создание стека_________________________________________________________________
class Stack {
  constructor() {
    this.items = [];
  }

  // Push element onto stack
  push(element) {
    this.items.push(element);
  }

  // Pop element from stack
  pop() {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  }

  // Get top element of stack
  peek() {
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get stack size
  size() {
    return this.items.length;
  }

  // Clear stack
  clear() {
    this.items = [];
  }
}

// Проверка ближайших клеток_________________________________________________________________
function checkNear(row, col) {
  let fillStack = new Stack();
  fillStack.push([row, col]);

  while (!fillStack.isEmpty()) {
    // 1. Get position
    let pos = fillStack.peek();
    fillStack.pop();
    // 2. Get row and col
    let row_num = Number(pos[0]);
    let col_num = Number(pos[1]);
    // 2. Open Cell
    openNearNumber(row_num, col_num);
    // 3. Check near cell's
    if (!squares[row_num][col_num].isDigit) {
      // Check rigth cell
      if (row_num + 1 < 16) {
        let sq_1 = squares[row_num + 1][col_num];
        if (!sq_1.isMine && !sq_1.isRevealed)
          fillStack.push([row_num + 1, col_num]);
      }
      // Check top cell
      if (col_num + 1 < 16) {
        let sq_2 = squares[row_num][col_num + 1];
        if (!sq_2.isMine && !sq_2.isRevealed)
          fillStack.push([row_num, col_num + 1]);
      }
      // Check left cell
      if (row_num - 1 >= 0) {
        let sq_3 = squares[row_num - 1][col_num];
        if (!sq_3.isMine && !sq_3.isRevealed)
          fillStack.push([row_num - 1, col_num]);
      }
      // Check bottom cell
      if (col_num - 1 >= 0) {
        let sq_4 = squares[row_num][col_num - 1];
        if (!sq_4.isMine && !sq_4.isRevealed)
          fillStack.push([row_num, col_num - 1]);
      }
      // Check left bottom cell
      if (col_num - 1 >= 0 && row_num - 1 >= 0) {
        let sq_4 = squares[row_num - 1][col_num - 1];
        if (!sq_4.isMine && !sq_4.isRevealed)
          fillStack.push([row_num - 1, col_num - 1]);
      }
      // Check right bottom cell
      if (col_num - 1 >= 0 && row_num + 1 < 16) {
        let sq_4 = squares[row_num + 1][col_num - 1];
        if (!sq_4.isMine && !sq_4.isRevealed)
          fillStack.push([row_num + 1, col_num - 1]);
      }
      // Check left top cell
      if (col_num + 1 < 16 && row_num - 1 >= 0) {
        let sq_4 = squares[row_num - 1][col_num + 1];
        if (!sq_4.isMine && !sq_4.isRevealed)
          fillStack.push([row_num - 1, col_num + 1]);
      }
      // Check right top cell
      if (col_num + 1 < 16 && row_num + 1 < 16) {
        let sq_4 = squares[row_num + 1][col_num + 1];
        if (!sq_4.isMine && !sq_4.isRevealed)
          fillStack.push([row_num + 1, col_num + 1]);
      }
    }
  }
}

// Открытие ближайших ячеек_________________________________________________________________
function openNearNumber(row, col) {
  let square = squares[row][col];

  if (!square.isRevealed) {
    if (square.isDigit) {
      square.element.classList.add(`digit_${square.numOfNeighbouringMines}`);
    } else square.element.classList.add("field__empty");

    square.isRevealed = true;
    numOfRevealed++;
  }
}

// Create grid of squares_____________________________________________________
function createBoard() {
  for (let i = 0; i < numOfRows; i++) {
    squares[i] = [];
    for (let j = 0; j < numOfCols; j++) {
      const square = document.createElement("div");
      square.className = "square";
      square.dataset.row = i;
      square.dataset.col = j;
      square.addEventListener("mousedown", handlePress);
      square.addEventListener("mouseup", handleClick);
      square.addEventListener("contextmenu", handleRightClick);
      document.addEventListener("mouseup", handleGlobalClick);
      gameField.appendChild(square);
      squares[i][j] = {
        element: square,
        isMine: false,
        isDigit: false,
        isRevealed: false,
        isFlagged: false,
        isQuestioned: false,
        numOfNeighbouringMines: 0,
      };
    }
  }
}

// Подсчитать пустые клеточки________________________________________________________
function revealSquare(square) {
  if (square.isRevealed || square.isFlagged) return;

  if (square.isDigit)
    square.element.classList.add(`digit_${square.numOfNeighbouringMines}`);
  else square.element.classList.add("field__empty");

  square.isRevealed = true;
  numOfRevealed++;
}

// Испуганный смайлик_________________________________________________________________
function handlePress(event) {
  if (
    !event.target.classList.contains("flagged") &&
    !event.target.classList.contains("questioned")
  ) {
    if (event.button === 0) {
      emoticon.src = "images/emoticonsButtons/btnScared.png";
    }
  }
}

function handleGlobalClick(event) {
  if (event.button === 0 && !gameEnded) {
    emoticon.src = "images/emoticonsButtons/btnRestart.png";
  }
}

// По левому клику_________________________________________________________________
function handleClick(event) {
  if (event.button === 0) {
    emoticon.src = "images/emoticonsButtons/btnRestart.png";

    if (gameEnded) {
      return;
    }

    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    const square = squares[row][col];

    if (square.isFlagged || square.isQuestioned) {
      return;
    }

    if (square.isMine) {
      hasWon = false;
      gameEnded = true;
      square.element.classList.add("bomb__expoled");
      gameOver();
    }

    if (!gameEnded) {
      revealSquare(square);

      if (numOfRevealed == 1) {
        startTimer();
      }

      if (numOfRevealed == 1) {
        const squareEmpty = document.querySelector(".field__empty");
        const emptyRow = Number(squareEmpty.dataset.row);
        const emptyCol = Number(squareEmpty.dataset.col);

        let numMinesRemaining = numOfMines;
        while (numMinesRemaining > 0) {
          const row = Math.floor(Math.random() * numOfRows);
          const col = Math.floor(Math.random() * numOfCols);
          if (row !== emptyRow || col !== emptyCol) {
            if (!squares[row][col].isMine) {
              squares[row][col].isMine = true;
              numMinesRemaining--;
              squares[row][col].element.classList.add("bomb_hidden");
            }
          }
        }
        // Calculate number of neighbouring mines for each square___________________
        for (let i = 0; i < numOfRows; i++) {
          for (let j = 0; j < numOfCols; j++) {
            if (squares[i][j].isMine) {
              continue;
            }
            for (let di = -1; di <= 1; di++) {
              for (let dj = -1; dj <= 1; dj++) {
                const ni = i + di;
                const nj = j + dj;
                if (ni < 0 || ni >= numOfRows || nj < 0 || nj >= numOfCols) {
                  continue;
                }
                if (squares[ni][nj].isMine) {
                  squares[i][j].numOfNeighbouringMines++;
                  squares[i][j].isDigit = true;
                }
              }
            }
          }
        }
      }

      if (square.isDigit)
        square.element.classList.add(`digit_${square.numOfNeighbouringMines}`);

      if (!square.isDigit) {
        checkNear(Number(row), Number(col));
        console.log(numOfRevealed);
      }

      if (numOfRevealed === numOfRows * numOfCols - numOfMines) {
        gameEnded = true;
        hasWon = true;
        gameOver();
      }
    }
  }
}

function gameReset() {
  // 1. Reset variables
  counter = 40;
  units = 0;
  dozens = 0;
  hundreds = 0;
  numOfRevealed = 0;
  // 2. Reset board
  for (let i = 0; i < numOfRows; i++)
    for (let j = 0; j < numOfCols; j++) squares[i][j].element.remove();
  squares = [];
  createBoard();
  gameEnded = false;
  // 3. Reset timer
  timerUnits.src = `images/timerDigits/timerDigit_0.png`;
  timerDozens.src = `images/timerDigits/timerDigit_0.png`;
  timerHundreds.src = `images/timerDigits/timerDigit_0.png`;
  clearInterval(timer);
  // 4. Reset counter
  counterUnits.src = `images/timerDigits/timerDigit_0.png`;
  counterDozens.src = `images/timerDigits/timerDigit_4.png`;
}

// RIGHT_CLICK___________________________________________________________________________________________
function handleRightClick(event) {
  if (numOfRevealed >= 1) {
    event.preventDefault();
    if (gameEnded) {
      return;
    }
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    const square = squares[row][col];
    if (!square.isRevealed && numOfFlagged != 40) {
      if (square.isFlagged) {
        square.isFlagged = false;
        square.element.classList.remove("flagged");
        square.element.classList.add("questioned");
        square.isQuestioned = true;
        numOfQuestioned++;
        numOfFlagged--;
        setCounter();
      } else if (square.isQuestioned) {
        square.isQuestioned = false;
        square.element.classList.remove("questioned");
        numOfQuestioned--;
      } else {
        square.isFlagged = true;
        square.element.classList.remove("bomb_hidden");
        square.element.classList.add("flagged");
        numOfFlagged++;
        setCounter();
      }
    } else if (square.isFlagged && numOfFlagged == 40) {
      square.isFlagged = false;
      square.element.classList.remove("flagged");
      square.element.classList.add("questioned");
      square.isQuestioned = true;
      numOfQuestioned++;
      numOfFlagged--;
      setCounter();
    }
  }
}

// START_COUNTER___________________________________________________________________________________________
const counterDigits = document.querySelectorAll(".game__counter_img");
counterDigits.forEach((image, index) => {
  image.dataset.id = index;
});

let counterDozens = document.querySelector("[data-id='1']");
let counterUnits = document.querySelector("[data-id='2']");

let numOfUnits = 0;
let numOfDozens = 4;

function setCounter() {
  if (numOfFlagged >= 41) return;
  let count = 40 - numOfFlagged;
  numOfUnits = count % 10;
  numOfDozens = Math.floor((count / 10) % 10);
  counterUnits.src = `images/timerDigits/timerDigit_${numOfUnits}.png`;
  counterDozens.src = `images/timerDigits/timerDigit_${numOfDozens}.png`;
}

// START_TIMER___________________________________________________________________________________________
const timerDigits = document.querySelectorAll(".game__timer_img");
timerDigits.forEach((image, index) => {
  image.dataset.id = index + 3;
});

let timerHundreds = document.querySelector("[data-id='3']");
let timerDozens = document.querySelector("[data-id='4']");
let timerUnits = document.querySelector("[data-id='5']");

let units = 0;
let dozens = 0;
let hundreds = 0;

function startTimer() {
  timer = setInterval(() => {
    if ((hundreds == 9 && dozens == 9 && units == 9) || gameEnded) {
      clearInterval(timer);
      return;
    }
    ++units;
    if (units == 10) {
      ++dozens;
      units = 0;
    }
    if (dozens == 10) {
      ++hundreds;
      dozens = 0;
    }
    timerUnits.src = `images/timerDigits/timerDigit_${units}.png`;
    timerDozens.src = `images/timerDigits/timerDigit_${dozens}.png`;
    timerHundreds.src = `images/timerDigits/timerDigit_${hundreds}.png`;
  }, 1000);
}

// GAME RESET___________________________________________________________________________________________
const emoticon = document.querySelector(".game__emoticon_img");

emoticon.addEventListener("mousedown", handlePushEmoticon);
function handlePushEmoticon(event) {
  if (event.button === 0) {
    emoticon.src = "images/emoticonsButtons/btnRestartPressed.png";
  }
}

emoticon.addEventListener("mouseup", handleResetEmoticon);
function handleResetEmoticon(event) {
  if (event.button === 0) {
    // location.reload(); // временный ресет
    gameReset();
    console.log("reset");
  }
}

// GAME_OVER_____________________________________________________________________________________________
function gameOver() {
  if (hasWon) {
    emoticon.src = "images/emoticonsButtons/btnWin.png";
    for (let i = 0; i < numOfRows; i++) {
      for (let j = 0; j < numOfCols; j++) {
        squares[i][j].element.style.pointerEvents = "none";
      }
    }
    console.log("ВЫИГРАЛ");
  } else {
    emoticon.src = "images/emoticonsButtons/btnLose.png";
    console.log("ПРОИГРАЛИ");
    for (let i = 0; i < numOfRows; i++) {
      for (let j = 0; j < numOfCols; j++) {
        squares[i][j].element.style.pointerEvents = "none";
        if (squares[i][j].isMine && !squares[i][j].isFlagged) {
          squares[i][j].element.classList.remove("bomb_hidden");
          squares[i][j].element.classList.remove("questioned");
          squares[i][j].element.classList.add("bomb");
        } else if (!squares[i][j].isMine && squares[i][j].isFlagged) {
          squares[i][j].element.classList.remove("bomb_hidden");
          squares[i][j].element.classList.add("not_bomb");
        }
      }
    }
  }
}

createBoard();
