const optionsField = document.getElementById("game-options");
const lettersField = document.getElementById("letters-field");
const userWord = document.getElementById("user-input");
const canvas = document.getElementById("canvas");
const newGamePopUp = document.getElementById("new-game");
const resultField = document.getElementById("game-result");
const newGameButton = document.getElementById("new-game-btn");

let options = {
    animals: ["tiger", "lizard", "lion", "bear", "panther", "snake", "wolf", "frog", "elephant", "zebra"],
    fruits: ["orange", "lemon", "pear", "apple", "cherry", "blueberry", "strawberry", "watermelon", "grape", "peach"],
    words: ["water", "sea", "school", "window", "dark", "animals", "beautiful", "sword", "subject", "energy"],
}

let wordDisplay = "";
let winCount = 0;
let lossCount = 0;

const showOptions = () => {
    optionsField.innerHTML = "<h3>Select Option</h3>";
    let optionsContainer = document.createElement("div");
    for(let event in options) {
        optionsContainer.innerHTML += `<button class="option" onclick="generateWord('${event}')">${event}</button>`;
    }
    optionsField.appendChild(optionsContainer);
}

const blockButtons = () => {
    const optionButtons = document.querySelectorAll(".option");
    const letterButtons = document.querySelectorAll(".keyButton");
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });
    letterButtons.forEach(btn => {
        btn.disabled = true;
    });
    newGamePopUp.classList.remove('hide');
}

const generateWord = (value) => {
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach(e => {
        if(e.innerText.toLowerCase() === value) {
            e.classList.add("active");
        };
        e.disabled = true;
    });
        lettersField.animate(universalAnim, 300);
        lettersField.classList.remove("hide");
        userWord.innerText = "";

        let drawWord = options[value];
        let singleWord = drawWord[(Math.floor(Math.random()* drawWord.length))];
        singleWord = singleWord.toUpperCase();
        wordDisplay = singleWord;
        let hiddenWord = singleWord.replace(/./g, '<span class="dashes">_</span>');
        userWord.innerHTML = hiddenWord;
        console.log(wordDisplay);
}

const init = () => {
    lettersField.classList.add("hide");
    lettersField.innerHTML = "";
    newGamePopUp.classList.add("hide");
    userWord.innerHTML = "";
    winCount = 0;
    lossCount = 0;
    for(let i = 65; i < 91; i++) {
        let keyButton = document.createElement("button");
        keyButton.classList.add('keyButton');
        keyButton.addEventListener("click", () => {
            let singleWordArray = wordDisplay.split("");
            let dashes = document.querySelectorAll("span.dashes")
            if(singleWordArray.includes(keyButton.innerText)) {
                singleWordArray.forEach((singleLetter, index) => {
                    if(singleLetter === keyButton.innerText) {
                        dashes[index].innerText = singleLetter;
                        keyButton.disabled = true;
                        winCount++;
                        if(winCount === singleWordArray.length) {
                            resultField.innerHTML = `<h2 class="won-message">You Won ! <p> The word was: <span>${wordDisplay}</span></p>`;
                            blockButtons();
                            resultField.animate(universalAnim, 1000);
                            newGameButton.animate(universalAnim, 1200);
                        }
                    }
                })
            } else {
                lossCount++
                keyButton.disabled = true;
                drawMan(lossCount);
                if(lossCount === 6) {
                    resultField.innerHTML = `<h2 class="loss-message">You Loss ! <p> The word was: <span>${wordDisplay}</span></p>`;
                    blockButtons();
                    resultField.animate(universalAnim, 1000);
                    newGameButton.animate(universalAnim, 1200);
                }
            }
        });





        lettersField.appendChild(keyButton);
        keyButton.innerText = String.fromCharCode(i);
    };
showOptions();
let { canvasDrawing } = hangMan();
canvasDrawing();
}


// Canvas

const hangMan = () => {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }

    const head = () => {
        ctx.beginPath();
        ctx.arc(70, 30, 10, 0, Math.PI * 2, true);
        ctx.stroke();
    };
    const body = () => {
        drawLine(70, 40, 70, 80);
    };
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };
    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };
    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    const canvasDrawing = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.arc(250, 30, 10, 0, Math.PI *2, true);
        drawLine(250, 40, 250, 80);
        drawLine(250, 50, 220, 20);
        drawLine(250, 50, 280, 20);
        drawLine(250, 80, 220, 130);
        drawLine(250, 80, 280, 50);

        drawLine(10, 130, 290, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10,10, 70, 10);
        drawLine(70, 10, 70, 20);
    }
    return {canvasDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};
}

const drawMan = (lossCount) => {
    let {head, body,leftArm, rightArm, leftLeg, rightLeg} = hangMan();
    switch (lossCount) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
}



newGameButton.addEventListener("click", init);
window.onload = init;

const universalAnim = [
    {opacity: -2},
    {opacity: 1}
]