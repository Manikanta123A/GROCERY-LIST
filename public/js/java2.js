let gameseq=[]
let myseq=[]
let started=false;
let level=0;

let color=['red','green','yellow','purple']

let h3=document.querySelector('h3')
document.addEventListener('keypress',function(){
    if (started==false){
        level=0
        myseq=[]
        gameseq=[]
        console.log("game started")
        started=true
        levelup()
    }
})
function flashbtn(btn){
    btn.classList.add("flash")
    setTimeout(function(){
       btn.classList.remove("flash")
    },300)
}
function userflashbtn(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
       btn.classList.remove("userflash")
    },300)
}
function levelup(){
    myseq=[]
    level++
    h3.innerText="level"+" "+level
    let rdnum=Math.floor((Math.random()*4))
    let rdmcol=color[rdnum]
    let btn =document.querySelector(`.${rdmcol}`)
    gameseq.push(rdmcol)
    console.log(gameseq)
    flashbtn(btn)
}
function checkseq(indx){
    if (myseq[indx]===gameseq[indx]){
        if(myseq.length==gameseq.length){
            console.log("ssame")
            setTimeout(levelup,1000)
        }
    }
    else{
        h3.innerText=`Game over and your score is ${level} enter any key to start the game `
        started=false
    }
}
function pressed(){
    console.dir(this)
    let btn=this
    userflashbtn(this)
    let user=btn.getAttribute("id")
    myseq.push(user)
    checkseq(myseq.length -1)
}
let allbtn=document.querySelectorAll('.box')
for(btn of allbtn){
    btn.addEventListener('click',pressed)
}
