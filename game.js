var turn = 1; //X: 1, O: 2
var won = 0; //0 -> not decided yet, 1 == x, 2 == o

var board = [];

var board_dim;   //User may select
var line_length; //User may select

function reset() { //Alias
    init();
}

function init(b_d = 6, l_l = 3) { //Reset game state
    board = [];
    board_dim   = b_d;
    line_length = l_l;
    document.getElementById("board").innerHTML = "";

    var fs  = (500/(board_dim))*2.5;
    var whl = 500/(board_dim);
    var pm  = whl*0.1;
    whl     = whl-(pm*2);
    var lh  = pm*8;

    for (var i = 0; i < board_dim; i++) {
        board[i] = [];
        var html = '<div class="board-row">';
        for (var j = 0; j < board_dim; j++) {
            board[i][j] = 0;
            html += `<div class="block" id="${i}${j}" onclick="makeMove(${i}, ${j})" style="width: ${whl}px; height: ${whl}px; font-size: ${fs}%; margin: ${pm}px; line-height: ${lh}px;"></div>`;
        }
        html += '</div>';
        document.getElementById("board").innerHTML += html;
    }
    won  = 0;
    turn = 1;
}

function makeMove(x, y) {
    if(board[x][y] != 0 || won != 0)
    {
        return 0;
    }

    board[x][y] = turn;

    document.getElementById(`${x}${y}`).innerHTML = turn == 1 ? "X" : "O";

    var vectors = [
        [0, 1],  // |
        [1, 1],  // /
        [1, -1], // \
        [1, 0]   // -
    ];

    var score = [0,0,0,0];

    var filled_board = true;

    for (var v = 0; v < vectors.length; v++) { //Loop through vectors
        for (var t = (line_length-1)*(-1); t <= (line_length-1); t++) { //3 on both sides

            var c_x = x + vectors[v][0]*t; //Add vector to current position
            var c_y = y + vectors[v][1]*t;

            if (c_x < 0 || c_x > board_dim-1 || c_y < 0 || c_y > board_dim-1) { continue; } //Is it outisde the boundaries

            score[v] = board[c_x][c_y] == turn ? score[v]+1 : 0; //Add to score

            if(board[c_x][c_y] == 0){filled_board=false;}

            if (score[v] == line_length) { //Break if we've found a winner
                won = turn;
                break;
            }
        }
    }
    if (won != 0) {
        var c_won = turn == 1 ? "X" : "O";
        alert(c_won + " won!");
        init(board_dim, line_length);
    } else if(filled_board) {
        alert("Draw!");
        init(board_dim, line_length);
    }

    turn = turn == 1 ? 2 : 1; //Switch turn

    return 1;
}
