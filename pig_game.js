var scores, activePlayer, roundScore, gamePlaying, dice;

//window.open('main.js?cancelled=transaction has been cancelled','_self');  




var total= init();

document.querySelector('#totalValue').addEventListener('blur', function() {
    total = document.getElementById('totalValue').value;
    console.log(total)
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying==true) {
        // console.log(dice);
       if(!dice) {
           prevDice=-1
       } else {
           var prevDice = dice;
       }
        
        dice = Math.floor(Math.random() * 6) + 1 ;
        
        var dice2 = Math.floor(Math.random() * 6) + 1 ;
        console.log(`${prevDice} and ${dice}`);
        
    
        var diceDom = document.querySelector('.dice1');
        diceDom.src = `images/dice-${dice}.png`;
        diceDom.style.display = 'block';
        var diceDom2 = document.querySelector('.dice2');
        diceDom2.src = `images/dice-${dice2}.png`;
        diceDom2.style.display = 'block';
    
        // if (dice=== 6 && prevDice=== 6) {
        //     scores[activePlayer] = 0;
        //     document.getElementById('score-' + activePlayer).textContent = 0;
        //     nextPlayer();
        // }

        if(dice !== 1) {
            roundScore= roundScore + dice + dice2;
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

        if(scores[activePlayer] >= total) {
            // console.log("Magic");
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`#name-${activePlayer}`).innerHTML='Winner';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
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

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function init() {

    var total = 15;

   

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
   

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';    

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

    return total;

}

document.querySelector('.btn-new').addEventListener('click', init);
