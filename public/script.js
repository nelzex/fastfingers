var resultsContainer = document.getElementById("results-container");
const currentWord = document.getElementById("word");
const wordInput = document.getElementById("wordBox");
const wpm = document.getElementById('wpm');
const startButton = document.getElementById('start');
const time = document.getElementById('time');


let timeLeft = 60;
var gameFinished = false;
let timeInterval;
var restart = false;
var wordsCompleted = 0;

async function loadWords(){
    
    var response = await fetch('./words.txt');
    var data = await response.text();

    return await data.split('\n');
    
}

loadWords().then((words) => {
    wordInput.addEventListener('keyup', (e) =>{
        if(e.keyCode == 32 || e.keyCode == 13 && gameFinished == false){
            //new word
            if(wordCorrect(wordInput.value,currentWord.innerText)){
                wordsCompleted ++;
                wordInput.value = null;
                currentWord.innerText = words[Math.floor(Math.random() * 997)];
            }
            else{
                wordInput.value = null;
                currentWord.innerText = words[Math.floor(Math.random() * 997)];
            }
        }
    })
    startButton.addEventListener('click',(e) =>{
        wordInput.focus();
        if(gameFinished == false){
            clearInterval(timeInterval);
            wpm.innerText = "";
            resultsContainer.className = 'results-container';
            timeInterval = setInterval(updateTime,1000);
            currentWord.innerText = words[Math.floor(Math.random() * 997)];
        }
        if(gameFinished == true){
            clearInterval(timeInterval);
            timeLeft = 60;
            wpm.innerText = "";
            currentWord.innerText ="";
            time.innerHTML = "";
            resultsContainer.className = 'results-container';
            gameFinished = false;
        }
    })


})



function wordCorrect(word1,word2){
    return word1 === word2;
}


function updateTime(){
    timeLeft--;
    time.innerHTML = timeLeft + 's';

    if(timeLeft == 0){
        gameFinished = true;
        clearInterval(timeInterval);
        wpm.innerText = wordsCompleted + ' wpm';
        resultsContainer.className = 'results-container show';
    }

}