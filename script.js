function gameLogic() {
    cells = 9;
    winner = false;
    gameboard = [];
    for (let r = 0; r < cells; r++) {
        gameboard[r] = [];
    }
    return gameboard, winner;
}

const boardUI = (function() {
    mainDiv = document.querySelector(".main");
    restartButton = document.querySelector(".restart-button");
    messageBar = document.querySelector(".bottom-bar");
    function reloadUI(gameboard)
    {
        mainDiv.innerHTML = "";
        gameLogic();
        for (let i = 0; i < gameboard.length; i++) {
                let newDiv = document.createElement("div");
                newDiv.classList.add("grid");
                newDiv.id = i;
                mainDiv.appendChild(newDiv);
                console.log(newDiv);
                if (gameboard[i].length === 0) {
                    newDiv.innerHTML = "";
                } else {
                    gameboard[i] = "X"
                }
            }
        } 
    return {
        reloadUI: reloadUI,
        messageBar,
        restartButton
    }
})();

function clickEvents() {
    let player1 = false;
    mainDiv.addEventListener("mousedown", function(e) {
            if (e.target.classList.contains("grid")) {
                console.log(e.target.id);
                if (e.target.innerHTML === "") {
                    if (player1 === false && winner === false) {
                        e.target.innerHTML = "X";
                        gameboard[e.target.id] = "X";
                        player1 = true;
                        checkWinner();
                    } else if (player1 === true && winner === false) {
                        e.target.innerHTML = "O";
                        gameboard[e.target.id] = "O"
                        player1 = false;
                        checkWinner();
                    }
            } 
            
            if (winner === true) {
                if (player1) {
                    endGame("Player 1")
                } else {
                    endGame("Player 2")
                }
            } 
            
        } 
    });

    restartButton.addEventListener("mousedown", function(e) {
        if(e.target.classList.contains("restart-button")) {
            boardUI.reloadUI(gameboard);
            messageBar.innerHTML = "";
        }
    });
}

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function checkWinner() {
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        const a = gameboard[winningCondition[0]];
        const b = gameboard[winningCondition[1]];
        const c = gameboard[winningCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        } 
        if (a === b && b === c) {
            winner = true; 
        }
    }
}

function endGame(player) {
    messageBar.innerHTML = `${player} WINS!`;
}

gameLogic();
boardUI.reloadUI(gameboard);
clickEvents();
