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
let sumEl=document.querySelector("#sum-el");
let cardsEl=document.getElementById("cards-el");
let playerEl=document.getElementById("player-el");
let rulesEl=document.getElementById("rules-el");
const cardContainer=document.getElementById("card-container");
const images=[
"<img  src='images/cardA.jpg' alt='cardA'>",
"<img  src='images/card2.jpg' alt='card2'>",
"<img  src='images/card3.jpg' alt='card3'>",
"<img  src='images/card4.jpg' alt='card4'>",
"<img  src='images/card5.png' alt='card5'>",
"<img  src='images/card6.jpg' alt='card6'>",
"<img  src='images/card7.jpg' alt='card7'>",
"<img  src='images/card8.jpg' alt='card8'>",
"<img  src='images/card9.jpg' alt='card9'>",
"<img  src='images/card10.jpg' alt='card10'>",
"<img  src='images/cardJ.png' alt='cardJ'>",
"<img  src='images/cardK.png' alt='cardK'>",
"<img  src='images/cardQ.png' alt='cardQ'>",
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
    setTimeout(function()
    {
        cardsEl.textContent=cardlist;
        cardContainer.innerHTML=imagelist;
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

    }, 500);
    
}

function startgame(){
    let firstCard=getRandomCard();
    let secondCard=getRandomCard();
    let card1image=images[firstCard[0]-1];
    let card2image=images[secondCard[0]-1];
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
        let newcardimage=images[newcard[0]-1];
        cards.push(newcard[1]);
        renderCardImages.push(newcardimage);
        sum+=newcard[1];
        rendergame();
    }
}
