let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let playerTurn = document.getElementById('playerTurn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning_blocks')

const O_Text = "O"
const X_Text = "X"

let currentPlayer = X_Text
let spaces = Array(9).fill(null)
let count_plays = 0

// To start game play

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))     
}

function boxClicked(i) {
   const id = i.target.id

   if(!spaces[id] && count_plays < 9){
    spaces[id] = currentPlayer
    i.target.innerText = currentPlayer

    if(playerWon() !=false) {
        playerText = `${currentPlayer} congrats you won!!`
        document.getElementById("playerText").innerText = playerText ;
        
      let winning_blocks = playerWon()
      count_plays = 10
      winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
      
      return

    }
   //Everytime a box is clicked the box clicked will be counted. If the counter reaches 9
   //then the game is a draw and the playerText header will say draw
     
   count_plays++
   if(count_plays == 9) {
    playerText.innerHTML = 'Draw!'
   }  

  //this code changes the playerText to whomevers turn it is on the header
   currentPlayer = currentPlayer == X_Text ? O_Text: X_Text
   document.getElementById("playerTurn").innerText =currentPlayer +"\'s Turn"
   }
}

//Creating a function to determine when a player has won

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWon() {
    for(const condition of winningCombos) {
        let [a,b,c] = condition

        if (spaces[a] && (spaces[a] == spaces[b]) && spaces[a] == spaces[c]) {
            return[a,b,c]
        }  
    }
    return false
}

//Setting up the reset button funtionality

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    count_plays = 0
    boxes.forEach(box => {
    box.innerText = ''
    box.style.backgroundColor=''
    })

    document.getElementById("playerText").innerText ='Tic Tac Toe'
    currentPlayer = X_Text
    document.getElementById("playerTurn").innerText =currentPlayer +"\'s Turn"
}

startGame()



