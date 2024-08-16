let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game when the document is touched or clicked
document.addEventListener("touchstart", startGame);
document.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your Score was <b>${level}</b> <br> Tap to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        setTimeout(reset, 1000);  // Delay reset to show score
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

// Add both touchstart and click events for buttons to ensure they work on mobile
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
    btn.addEventListener("touchstart", btnPress);
    btn.addEventListener("click", btnPress);
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.removeEventListener("touchstart", startGame);
    document.removeEventListener("click", startGame);
    document.addEventListener("touchstart", startGame);
    document.addEventListener("click", startGame);
}
