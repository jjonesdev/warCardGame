let suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten',
    'Nine', 'Eight', 'Seven', 'Six', 'Five',
    'Four', 'Three', 'Two'
];

let playerOneTitle = document.getElementById('playerOne-title');
let playerOneText = document.getElementById('playerOne-text');
let playerOneCount = document.getElementById('playerOne-count');

let playerTwoTitle = document.getElementById('playerTwo-title');
let playerTwoText = document.getElementById('playerTwo-text');
let playerTwoCount = document.getElementById('playerTwo-count');
let warButton = document.getElementById('war');
let newGameButton = document.getElementById('newGame');


let deck = [];
playerOneCards = [];
playerTwoCards = [];
gameOver = false;
playerOneScore = 0;
playerTwoScore = 0;

playerOneTitle.style.display = 'none';
playerOneText.style.display = 'none';
playerOneCount.style.display = 'none';

playerTwoTitle.style.display = 'none';
playerTwoText.style.display = 'none';
playerTwoCount.style.display = 'none';
warButton.style.display = 'none';

showStatus();

newGameButton.addEventListener('click', function () {
    playerOneCards.length = 0;
    playerTwoCards.length = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    gameOver = false;
    
    deck = createDeck();
    shuffleDeck(deck);
    //dealDeck();

    newGameButton.style.display = 'none';

    playerOneTitle.style.display = 'block';
    playerOneText.style.display = 'block';
    playerOneCount.style.display = 'block';

    playerTwoTitle.style.display = 'block';
    playerTwoText.style.display = 'block';
    playerTwoCount.style.display = 'block';

    warButton.style.display = 'block';
    showStatus();

});

warButton.addEventListener('click', function () {
    playerOneCards = [getNextCard()];
    playerTwoCards = [getNextCard()];

    cardCompare();
    showStatus();
    console.log(deck.length);
    checkEndOfGame();
    if(gameOver == true) {
        if(playerOneScore > playerTwoScore){
            playerOneTitle.innerText = 'Player One Wins!';
        } else
        playerTwoTitle.innerText = 'Player Two Wins!';
        showStatus();
        warButton.style.display = 'none';
        newGameButton.style.display = 'block';
    }
});


/* Didn't need this function since getNextCard deals them correctly, however in the game of war you 
technically deal the cards out first and then play, getNextCard is pulling the card from a deck everytime.


function dealDeck() {
    for (let i = 0; i < deck.length; i++) {
        if (i % 2 == 0) {
            playerOneCards.push(deck[i]);
        } else
            playerTwoCards.push(deck[i]);
    }
}
*/


function createDeck() {
    let deck = [];
    for (let suitsIdx = 0; suitsIdx < suits.length; suitsIdx++) {
        for (let valuesIdx = 0; valuesIdx < values.length; valuesIdx++) {
            let card = {
                value: values[valuesIdx],
                suit: suits[suitsIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp;
    }
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardValue(card) {
    switch(card.value) {
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        case 'Ten': 
            return 10;
        case 'Jack':
            return 11;
        case 'Queen':
            return 12;
        case 'King':
            return 13;
        case 'Ace':
            return 14;
    }
}

function cardCompare(card) {

    for (let i = 0; i < playerOneCards.length; i++){
        for (let j = 0; j < playerTwoCards.length; j++) {
            let p1 = getCardValue(playerOneCards[i]);
            let p2 = getCardValue(playerTwoCards[j]);
            if(p1 > p2) {
                playerOneScore += 2;
            }
            if (p2 > p1) {
                playerTwoScore += 2;
            }
            if((p1 === p2) || (p2 === p1)) {
                console.log('in p1 === p2');
                playerOneCards = [getNextCard()];
                playerTwoCards = [getNextCard()];

                let p1 = getCardValue(playerOneCards[i]);
                let p2 = getCardValue(playerTwoCards[j]);

                if(p1 > p2) {
                    console.log('in equals p1 > p2');
                    playerOneScore += 6;
                }
                if (p2 > p1) {
                    console.log('in equals p2 > p1');
                    playerTwoScore += 6;
                }

                playerOneCards = [getNextCard()];
                playerTwoCards = [getNextCard()];
            }           
        }
    }    
}

function checkEndOfGame() {
    if(deck.length === 0) {
        return gameOver = true;
    }
}
    

function showStatus() {

    let playerOneStr = '';
    for (let i = 0; i < playerOneCards.length; i++) {
        playerOneStr = getCardString(playerOneCards[i]);
        playerOneCount.innerText = 'Card Count: ' + playerOneScore;
    }

    let playerTwoStr = '';
    for (let i = 0; i < playerTwoCards.length; i++) {
        playerTwoStr = getCardString(playerTwoCards[i]);
        playerTwoCount.innerText = 'Card Count: ' + playerTwoScore;
    }   

    playerOneText.innerText = playerOneStr;
    playerTwoText.innerText = playerTwoStr;

}