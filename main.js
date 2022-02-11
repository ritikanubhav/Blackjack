let player={
    name:"Player1",
    chips:500
}
let cards=[];
let renderCardImages=[];
let sum=0;
let hasBlackjack=false;
let isAlive=false;
let message="";
let messageEl=document.getElementById("message-el");
const sumEl=document.querySelector("#sum-el");
const cardsEl=document.getElementById("cards-el");
const playerEl=document.getElementById("player-el");
const rulesEl=document.getElementById("rules-el");
const cardContainer=document.getElementById("card-container");
const imagesUrl=[
"images/cardA.jpg",
"images/card2.jpg",
"images/card3.jpg",
"images/card4.jpg",
"images/card5.png",
"images/card6.jpg",
"images/card7.jpg",
"images/card8.jpg",
"images/card9.jpg",
"images/card10.jpg",
"images/cardJ.png",
"images/cardK.png",
"images/cardQ.png",
]

function getRandomCard(){
    let random=Math.ceil(Math.random()*13);
    let randomcard= [random];
    if(randomcard[0]===1||randomcard[0]>10)
        randomcard.push(10);
    else 
        randomcard.push(random);
    return randomcard;
}
function rendergame()
{
    rulesEl.style.display="none";
    let cardlist="Cards:";
    let imagelist="";
    for(let i=0;i<cards.length;i++){
        cardlist+=" "+cards[i];
        imagelist+=renderCardImages[i];
    }
    cardContainer.innerHTML=`${imagelist}`;
    let lastCard=document.getElementById(`card${renderCardImages.length}`);
    lastCard.onload=function()
    {
        cardsEl.textContent=cardlist;
        sumEl.textContent="Sum: "+sum;
        if(sum<=20)
        {
            message="Want to draw a new card?";
        }
        else if(sum===21)
        {
            message="You've got BlackJack!";
            hasBlackjack=true;
            player.chips*=2;
        }
        else
        {
            message="You're out of the game!";
            isAlive=false;
            player.chips=0;
        }
        messageEl.textContent=message;
        playerEl.textContent=player.name+": $"+player.chips;

    };
}

function startgame(){
    let firstCard=getRandomCard();
    let secondCard=getRandomCard();
    let card1image=`<img id="card1" src="${imagesUrl[firstCard[0]-1]}">`;
    let card2image=`<img id="card2" src="${imagesUrl[secondCard[0]-1]}">`;
    cards=[firstCard[1],secondCard[1]];
    renderCardImages=[card1image,card2image];
    sum=firstCard[1]+secondCard[1];
    isAlive=true;
    hasBlackjack=false;
    player.chips=500;
    rendergame();
}

function newcard(){
    if(isAlive===true&&hasBlackjack===false){
        let newcard=getRandomCard();
        let newcardimage=`<img id="card${renderCardImages.length+1}" src="${imagesUrl[newcard[0]-1]}">`;
        cards.push(newcard[1]);
        renderCardImages.push(newcardimage);
        sum+=newcard[1];
        rendergame();
    }
}
