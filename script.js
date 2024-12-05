let body = document.querySelector("body");
let container = document.querySelector(".container");
let game = document.querySelector(".game");
let reset = document.querySelector("#reset");
let boxs = document.querySelectorAll(".box");
let msgCont = document.querySelector(".msg_container");
let newGame = document.querySelector("#new_game");
let result = document.querySelector("#result");

let turnX = true;
let countClick = 0;

const resetGame = () =>{
    turnX = true;
    countClick = 0;
    enableBoxes();
    msgCont.classList.add("hide");
};

const winPat = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [6, 7, 8],
    [2, 5, 8],
    [2, 4, 6]
];
boxs.forEach((box)=> {
    box.addEventListener("click", () =>{
        console.log("box is clicked");
        if(turnX){
            box.innerText = "X";
            box.classList.add("colorX");
            turnX = false;
        }else{
            box.innerText = "O";
            box.classList.add("colorY");
            turnX = true;
        }
        box.disabled = true;
        countClick++

        let isWinner = checkWinner();
        
        if ( countClick === 9 && !isWinner){
            showDraw();
        }
    })
});

const disableBoxes = () =>{
    for(let box of boxs ){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxs ){
        box.disabled = false;  //enable
        box.innerText = "";
    }
};

const showDraw = () =>{  //to print no one won
    result.innerText = `!!!Draw!!!`;
    msgCont.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) =>{  //to print who won
    result.innerText = `Congratulations!! Winner is ${winner}`;
    msgCont.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () =>{
    for(let pattern of winPat){  //to check winner from the patern in array above
        let pos1Val = boxs[pattern[0]].innerText;
        let pos2Val = boxs[pattern[1]].innerText;
        let pos3Val = boxs[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner");
                console.log(pos1Val,pos2Val,pos3Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
