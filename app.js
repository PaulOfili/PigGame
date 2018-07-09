var scores, activePlayer, roundScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying==true) {

        var dice = Math.floor(Math.random() * 6) + 1 ;
        
    
        var diceDom = document.querySelector('.dice');
        diceDom.src = `dice-${dice}.png`;
        diceDom.style.display = 'block';
    
        if(dice !== 1) {
            roundScore= roundScore + dice;
            // console.log(roundScore);
            document.querySelector('#current-' + activePlayer).innerHTML = `${roundScore}`;
        } else {
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying==true) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).innerHTML = `${scores[activePlayer]}`;

        if(scores[activePlayer] >= 15) {
            console.log("Magic");
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`#name-${activePlayer}`).innerHTML='Winner';
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    document.querySelector('#current-' + activePlayer).innerHTML = '0';

    activePlayer===0 ? activePlayer=1 : activePlayer=0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('#name-0').innerHTML='PLAYER 1';
    document.querySelector('#name-1').innerHTML='PLAYER 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click', init);
