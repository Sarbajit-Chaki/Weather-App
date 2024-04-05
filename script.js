let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector(".reset-btn")
let winner = document.querySelector(".hide>h2")

let turn = 1    //To track who's turn now
let count = 0   //To track how many boxes are filled

const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn==1){
            box.innerHTML = "X"
            turn = 0
        }
        else if(turn==0){
            box.innerHTML = "O"
            turn = 1
        }
        box.disabled = true // disable the marked box that it not be overwright
        
        count++
        let isWinner =  checkWinner()
        if(count == 9 && !isWinner){
            winner.innerHTML = `Oh, It's a Draw`
            document.querySelector(".hide").style.display = "block"
        }
    })
})

function checkWinner(){
    for (const pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText
        let pos2 = boxes[pattern[1]].innerText
        let pos3 = boxes[pattern[2]].innerText

        if(pos1 != "" && pos2 != "" && pos3 != ""){

            if(pos1 === pos2 && pos2 === pos3){
                markBox(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])
                winner.innerHTML = `Congratulations, Winner is  ${pos1}`
                document.querySelector(".hide").style.display = "block"
                disableBoxes()
                return true
            }
        }
    }
}

function markBox(b1,b2,b3){
    b1.style.backgroundColor = "#5BBA6F"
    b2.style.backgroundColor = "#5BBA6F"
    b3.style.backgroundColor = "#5BBA6F"
}

function disableBoxes(){
    for (const box of boxes) {
        box.disabled = true
    }
}

function enableBoxes(){
    for (const box of boxes) {
        box.disabled = false
        box.innerHTML = ""
        document.querySelector(".hide").style.display = "none"
        count = 0
        box.style.backgroundColor = "#FCEFF9"
    }
}

document.querySelector(".reset-btn").addEventListener("click",enableBoxes)