var tsquares = document.getElementsByClassName("tsquare");
var turnCounter = 0;
var boardState = [[0,0,0],
                  [0,0,0],
                  [0,0,0]];

for (var i = 0; i < tsquares.length; i++) {
    tsquares[i].addEventListener("click", clickEvent);
    tsquares[i].id = i;
    tsquares[i].x = i - Math.floor(i/3) * 3;
    tsquares[i].y = Math.floor(i/3);
}

function clickEvent(evt)
{
    ct = evt.currentTarget;
    if (boardState[ct.y][ct.x] == 0) {
        if (turnCounter % 2 == 0) {
            boardState[ct.y][ct.x] = 1;
        } else {
            boardState[ct.y][ct.x] = 2;
        }
        turnCounter++;
        updateBoard();
        console.log(boardState);
        if (checkWinState()) {
            document.getElementById("msgBox").innerHTML = ("Player " + (((turnCounter - 1) % 2) + 1) + " wins!");
            turnCounter = 0;
            resetBoard();
            setTimeout(function(){document.getElementById("msgBox").innerHTML = "";updateBoard();}, 2000);
        }
    }
}

/*
 *  [0][1][2]
 *  [3][4][5]
 *  [6][7][8] 
 *
 */

function updateBoard() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (boardState[i][j] == 0) {
                document.getElementById(i * 3 + j).style.backgroundImage="url(images/clear.png)";
            }
            if (boardState[i][j] == 1) {
                document.getElementById(i * 3 + j).style.backgroundImage="url(images/cross.png)";
            }
            if (boardState[i][j] == 2) {
                document.getElementById(i * 3 + j).style.backgroundImage="url(images/nought.png)";
            }
        }
    }
}

function resetBoard() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            boardState[i][j] = 0;
        }
    }
}

function checkWinState() {
    var bs = boardState;
    for (var i = 0; i < 3; i++) {
        if (bs[i][0] != 0 && bs[i][0] == bs[i][1] && bs[i][0] == bs[i][2]) {
            return true;
        }
        if (bs[0][i] != 0 && bs[0][i] == bs[1][i] && bs[0][i] == bs[1][i]) {
            return true;
        }
    }
    if (bs[1][1] != 0 && bs[1][1] == bs[0][0] && bs[1][1] == bs[2][2] || bs[1][1] != 0 && bs[1][1] == bs[0][2] && bs[1][1] == bs[2][0]) {
        return true;
    }
    return false;
}
