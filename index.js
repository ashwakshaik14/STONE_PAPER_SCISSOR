function hideRules() {
    document.getElementById('rules').style.display = 'none';
}

function showRules() {
    document.getElementById('rules').style.display = 'block';
}

const hideBox = document.querySelector('.nextbtn');
const addBox = document.getElementById('addBox');

const choices = ["stone", "paper", "scissors"];
const buttons = document.querySelectorAll('.number');
const result = document.getElementById('myChoice');
const mainElement = document.querySelector(".main");

// Score changer
let savedCompsScore = parseInt(localStorage.getItem('compsScore')) || 0;
let savedUsersScore = parseInt(localStorage.getItem('usersScore')) || 0;

let comp = document.getElementById('com');
let user = document.getElementById('you');

// Set initial scores
comp.textContent = savedCompsScore;
user.textContent = savedUsersScore;

// Toggle hiding of mumma and resgen circles
const hideGame = document.querySelector('#game');
const hideAddBox = document.querySelector('.addBox');
const statusBar = document.getElementById('status');
const mainResBox = document.querySelector('.resbox');

// Result generator
buttons.forEach(button => {
    button.addEventListener('click', playGame);
    button.addEventListener('click', function () {
        hideGame.style.display = 'none'; // Hide the mumma block on choosing an option
        hideAddBox.style.display = 'flex'; // Show the addbox button block
        mainResBox.style.display = 'block';
    });
});

function playGame(event) {
    const playerChoice = event.currentTarget.id; // Use currentTarget instead of target to get the button IDip
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = getWinner(playerChoice, computerChoice);
    const secondPulse = document.querySelector(".twopulse");
    const firstPulse = document.querySelector(".onepulse");

    statusBar.textContent = `${winner} `;


    console.log("Player Choice:", playerChoice);  // Debugging player choice
    console.log("Computer Choice:", computerChoice);  // Debugging computer choice

    const mainTwoElement = document.querySelector('.main.one');
    const mainOneElement = document.querySelector('.main.two');

    switch (computerChoice) {
        case 'stone':  // Update from 'rock' to 'stone'
            mainTwoElement.style.display = 'block';  // Ensure the element is visible
            mainTwoElement.style.right = '20%';
            mainTwoElement.style.backgroundImage = 'url("stone.png")';
            console.log("com background: stone.png");
            mainTwoElement.style.borderColor = 'var(--bx1)';
            break;
        case 'paper':
            mainTwoElement.style.display = 'block';  // Ensure the element is visible
            mainTwoElement.style.right = '20%';
            mainTwoElement.style.backgroundImage = 'url("paper.png")';
            console.log("com background: paper.png");
            mainTwoElement.style.borderColor = 'var(--bx3)';
            break;
        case 'scissors':
            mainTwoElement.style.display = 'block';  // Ensure the element is visible
            mainTwoElement.style.right = '20%';
            mainTwoElement.style.backgroundImage = 'url("scissor.png")';
            console.log("com background: scissor.png");
            mainTwoElement.style.borderColor = 'var(--bx2)';
            break;
        default:
            break;
    }



    // Update the player's choice background
    switch (playerChoice) {
        case 'stone':  // Update from 'rock' to 'stone'
            mainOneElement.style.display = 'block';  // Ensure the element is visible
            mainOneElement.style.left = '20%';
            mainOneElement.style.backgroundImage = 'url("stone.png")';
            console.log("com background: stone.png");
            mainOneElement.style.borderColor = 'var(--bx1)';
            break;
        case 'paper':
            mainOneElement.style.display = 'block';  // Ensure the element is visible
            mainOneElement.style.left = '20%';
            mainOneElement.style.backgroundImage = 'url("paper.png")';
            console.log("com background: paper.png");
            mainOneElement.style.borderColor = 'var(--bx3)';
            break;
        case 'scissors':
            mainOneElement.style.display = 'block';  // Ensure the element is visible
            mainOneElement.style.left = '20%';
            mainOneElement.style.backgroundImage = 'url("scissor.png")';
            console.log("com background: scissor.png");
            mainOneElement.style.borderColor = 'var(--bx2)';
            break;
        default:
            break;
    }


    window.addEventListener('load', () => {
        if (localStorage.getItem('usersScore')) {
            user.textContent = localStorage.getItem('usersScore');
        } else {
            localStorage.setItem('usersScore', 0);
            user.textContent = 0;
        }

        if (localStorage.getItem('compsScore')) {
            comp.textContent = localStorage.getItem('compsScore');
        } else {
            localStorage.setItem('compsScore', 0);
            comp.textContent = 0;
        }
    });

    // Event listener for 'Play Again' button
    addBox.addEventListener('click', () => {
        resetAnimation();
        hideGame.style.display = 'block';
        mainResBox.style.display = 'none';
        hideAddBox.style.display = 'none';  // Hide Play Again button after clicking

        // Keep the scores intact when resetting the game UI
        user.textContent = localStorage.getItem('usersScore');
        comp.textContent = localStorage.getItem('compsScore');
    });

    // Update the scoreboard based on the winner
    if (winner === "YOU WIN") {
        user.textContent = parseInt(user.textContent) + 1;
        localStorage.setItem('usersScore', user.textContent);  // Store updated score
        toggleAnimation(firstPulse);
        hideBox.classList.remove('hidden');  // Show Next button
    } else if (winner === "YOU LOST") {
        comp.textContent = parseInt(comp.textContent) + 1;
        localStorage.setItem('compsScore', comp.textContent);  // Store updated score
        toggleAnimation(secondPulse);
    } else {
        toggleAnimation(firstPulse);
        toggleAnimation(secondPulse);
    }

    // Animation reset function
    function resetAnimation() {
        firstPulse.classList.remove("animate");
        secondPulse.classList.remove("animate");
    }

    // Animation toggle function
    function toggleAnimation(pulseElement) {
        pulseElement.classList.toggle("animate");
    }
}

function getWinner(player, computer) {
    const TIE = "TIE UP";
    const WIN = "YOU WIN";
    const LOSE = "YOU LOST";

    if (player === computer) {
        return TIE;
    } else if (
        (player === "stone" && computer === "scissors") ||
        (player === "paper" && computer === "stone") ||
        (player === "scissors" && computer === "paper")
    ) {
        return WIN;
    } else {
        return LOSE;
    }
}
