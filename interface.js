const container = document.querySelector('.container');
const submit = document.querySelector('.submit');
const player_info = document.querySelector('.player_info')
const player1_info = document.querySelector('.info_player1');
const player2_info = document.querySelector('.info_player2');

const player_1 = document.getElementById('player-1');
const player_2 = document.getElementById('player-2');

const displayboard = document.createElement('div'); 

displayboard.classList.add('displayboard');
displayboard.style.cssText = "display:flex;flex-direction: column;";

// Add displayboard to container
container.appendChild(displayboard);

submit.addEventListener('click', () => {
    const player_turn = document.createElement('div');
    player_turn.classList.add('player_turn');
    container.insertBefore(player_turn, container.children[1]);

    const restart_button = document.createElement('div');
    restart_button.classList.add('restart-button');
    restart_button.textContent = "Restart";

    

    container.appendChild(restart_button);

    player_info.remove();
    submit.remove();

    function makeGameBoard(size = 3){
        board = [];
    
        const initialiseBoard = () => {
            for(let i = 0; i < size; i++){
                // Add row to display board
                const row = document.createElement('div');
                row.classList.add('row');
                row.style.cssText = "display:flex;"
                displayboard.appendChild(row);
                board[i] = [];
    
                for(let j = 0; j < size; j++){
                    // Add cells to displayboard
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    row.appendChild(cell);
                    
                    // cell.appendChild(O);
                    board[i][j] = '';
                }
            }
        }
    
        initialiseBoard();
    
        const getBoard = () => board;
 
        const addCell = (get_key, value) => {
            if(get_key.innerHTML !== ""){
                return;
            }
            else{ 
                if (value == 'X'){
                    const X = document.createElement('p');
                    X.innerHTML = 'X';
                    X.classList.add("X");
                    get_key.appendChild(X);
                }
                else if(value == 'O'){
                    const O = document.createElement('p');
                    O.innerHTML = 'O';
                    O.classList.add("O");
                    get_key.appendChild(O);
                }
            }
        }
    
        const restartBoard = () => {
            for(let i =0; i< board.length; i++){
                for(let j = 0; j < board.length; j++){
                    board[i][j] = '';
                }
            }
        }
    
        return{
            getBoard,
            addCell,
            restartBoard
        }
    }
    
    function createPlayer(name, symbol){
        return{
            name,
            symbol
        }
    }
    
    
    
    let currentPlayer;
    
    function gameController(player1, player2, gameboard){
        
        currentPlayer = player1;
        
        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1 ? player2: player1;
        }
        
        
    
        const playRound = () => {
            
            const get_cell = document.querySelectorAll('.cell');

            function cellClick(e){
                const cell = e.target;

                if(cell.innerHTML === ''){
                    gameboard.addCell(cell, currentPlayer.symbol);

                    if(gameWin()){
                        const gameWinTextBoard = document.createElement('div');
                        gameWinTextBoard.classList.add('game-win');
                        container.insertBefore(gameWinTextBoard, container.children[2])
                        player_turn.style.display = "none";
                        gameWinTextBoard.innerHTML = `${currentPlayer.name} wins`

                        get_cell.forEach((cell) => {
                            cell.removeEventListener('click', cellClick);
                        });
                    }

                    else if(gameDraw()){
                        const drawtextBoard = document.createElement('div');
                        drawtextBoard.classList.add('game-draw');
                        container.insertBefore(drawtextBoard, container.children[2])
                        drawtextBoard.innerHTML = "It's a draw!";
                        player_turn.style.display = "none";

                        get_cell.forEach((cell) => {
                            cell.removeEventListener('click', cellClick);
                        });
                    }

                    switchPlayer();
                    player_turn.innerHTML = `${currentPlayer.name}'s turn`;
                }

            }
            get_cell.forEach((cell) => {
                cell.addEventListener('click', cellClick);
            })

            restart_button.addEventListener('click', () => {  
                switchPlayer()
                const get_cell = document.querySelectorAll('.cell');

                if(gameWin()){
                    player_turn.style.display = "block";
                    const game_win = document.querySelector('.game-win');
                    game_win.style.display = "none"
                    
                    get_cell.forEach((cell) => {
                        cell.addEventListener('click', cellClick);
                    });
                }
                
                else if(gameDraw()){
                    const drawtextBoard = document.querySelector('.game-draw');
                    player_turn.style.display = "block";
                    drawtextBoard.style.display = "none";
                    get_cell.forEach((cell) => {
                        cell.addEventListener('click', cellClick);
                    });
                }
                
                get_cell.forEach((cell) => cell.textContent = '');
                currentPlayer = player1;
                player_turn.innerHTML = currentPlayer.name + "'s turn";
            })
          
        }

        
    
        const gameWin = () => {
            const symbol = currentPlayer.symbol;
            const get_row = document.querySelectorAll('.row');

            for(let i = 0; i < 3; i++){
                if(get_row[i].children[0].textContent === symbol && get_row[i].children[1].textContent === symbol && get_row[i].children[2].textContent === symbol){
                    return true;
                }
                if(get_row[0].children[i].textContent === symbol && get_row[1].children[i].textContent === symbol && get_row[2].children[i].textContent === symbol){
                    return true;
                }
            }
            if(get_row[0].children[0].textContent === symbol && get_row[1].children[1].textContent === symbol && get_row[2].children[2].textContent === symbol){
                return true;
            }
            if(get_row[0].children[2].textContent === symbol && get_row[1].children[1].textContent === symbol && get_row[2].children[0].textContent === symbol){
                return true;
            }
            
            return false;
            }
        
        const gameDraw = () => {
            
            const get_cell = document.querySelectorAll('.cell');
            const array_get_cell = Array.from(get_cell)

            let sum = '';
            for(let i = 0; i< 9; i++){
                sum += array_get_cell[i].textContent;

                if(sum.length == 9){
                    console.log("IT'S A DRAW AHHAHAH");
                    return true;
                }
            }
        }
    
        const startGame = () => {
            currentPlayer = player1;
            player_turn.innerHTML = currentPlayer.name + "'s turn";
        }
    
        return{
            startGame,
            playRound,
        }
    }
    
    const Gameboard = makeGameBoard();
    const player1 = createPlayer(player_1.value, "X");
    const player2 = createPlayer(player_2.value, "O");
    const Game = gameController(player1, player2, Gameboard);
    
    Game.startGame();
    Game.playRound();
    
    // console.log(get_row);
    
    // console.log(Gameboard.getBoard());
})


