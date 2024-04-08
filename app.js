const COMPUTER_SCORE_EL = document.getElementById("computer-score");
const USER_SCORE_EL = document.getElementById("user-score");
const COMPUTER_INPUT_IMG_CONTAINER = document.getElementById("computer-input-img-container");
const USER_INPUT_IMG_CONTAINER = document.getElementById("user-input-img-container");
const COMPUTER_INPUT_TEXT_EL = document.getElementById("computer-input-text");
const USER_INPUT_TEXT_EL = document.getElementById("user-input-text");
const OPTION_ICON_EL = document.querySelectorAll(".option-icon")

let computerInput = "";
let userInput = "";
let computerScore = 0;
let userScore = 0;
const ELEMENTS = ["rock", "paper", "scissors"];
const ELEMENT_ICONS = {
    rock: '<i class="fas fa-hand-rock element-icon" ></i>',
    paper: '<i class="fas fa-hand-paper element-icon"></i>',
    scissors: '<i class="fas fa-hand-scissors element-icon"></i>'
}
let active = false;

COMPUTER_SCORE_EL.textContent = computerScore;
USER_SCORE_EL.textContent = userScore;

const RENDER_GAME = (OPTION_ICON_EL) => {
    active = true
    userInput = OPTION_ICON_EL.getAttribute("id").toLowerCase()

    const GET_COMPUTER_ELEMENT_INDEX = () => {
        let randomNumber = Math.floor( Math.random() * 3 );
        return randomNumber;
    }
    
    // display User's pick
    USER_INPUT_TEXT_EL.textContent = userInput
    USER_INPUT_IMG_CONTAINER.innerHTML = ELEMENT_ICONS[userInput]

    //  display Computer's pick
    setTimeout(() => {
        computerInput =  ELEMENTS[GET_COMPUTER_ELEMENT_INDEX()];
        COMPUTER_INPUT_TEXT_EL.textContent = computerInput;
        COMPUTER_INPUT_IMG_CONTAINER.innerHTML = ELEMENT_ICONS[computerInput];

        DECIDE_RESULT()

        // resseting computer's and user's Picks
            setTimeout(() => {
                RESET_PICK()
            }, 1500)
        // ===========================================
    }, 1500)
    // ==========================================
}

const RESET_PICK = () => {
    userInput = "";
    computerInput = "";
    USER_INPUT_TEXT_EL.textContent = userInput;
    COMPUTER_INPUT_TEXT_EL.textContent = computerInput;
    USER_INPUT_IMG_CONTAINER.innerHTML = "";
    COMPUTER_INPUT_IMG_CONTAINER.innerHTML = "";
    active = false
} 

const DECIDE_RESULT = () => {

    function computerUserWins(winner, loser) {
        let winPossibilities = (winner, loser) => {
            return (winner === "rock" && loser === "scissors") || (winner === "scissors" && loser === "paper") || (winner === "paper" && loser === "rock")
        }
        return winPossibilities(winner, loser)
    }

    if (computerUserWins(computerInput, userInput)) {
        computerScore += 1;
        COMPUTER_SCORE_EL.textContent = computerScore;
    } else if (computerUserWins(userInput, computerInput)) {
        userScore += 1;
        USER_SCORE_EL.textContent = userScore;
    }
    return
}

OPTION_ICON_EL.forEach(optionIconEL => {
    optionIconEL.addEventListener("click", () => {
        if (!active) RENDER_GAME(optionIconEL)
    })
})