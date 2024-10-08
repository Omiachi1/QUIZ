const saveScorebtn = document.getElementById('saveScoreBtn');
const username = document.getElementById('username');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
finalScore.innerText = mostRecentScore;


const highsScore = JSON.parse(localStorage.getItem('highScore'));
console.log('highScore');
username.addEventListener('keyup', () => {
    saveScorebtn.disabled =  !username.value;
});

