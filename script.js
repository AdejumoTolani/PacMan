const board = document.querySelector('.board');
const leftBtn = document.querySelector('.left')
const rightBtn = document.querySelector('.right')
const upBtn = document.querySelector('.up')
const downBtn = document.querySelector('.down')


const cells = [];
let pacmanIndex = 420;
const width = 30;
let moves = [-1,1,width,-width]
let move = moves[Math.floor(Math.random() * moves.length)]
const blueprint = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,
    0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1,0,
    0,1,1,1,1,1,1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,1,1,1,1,1,1,1,0,
    3,1,0,0,0,0,1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,1,0,0,0,0,1,1,
    0,1,1,1,1,1,1,1,1,1,1,0,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];


function createBoard(){
    for(let i = 0; i < blueprint.length; i++){
        let cell = document.createElement('div');
        board.appendChild(cell);
        cells.push(cell);
        if(blueprint[i] == 0){
            cells[i].classList.add('wall');
        }
        else if(blueprint[i] == 1){
            cells[i].classList.add('pellet');
        }
        else if(blueprint[i] == 2){
            cells[i].classList.add('ghost-home');
        }
        else if(blueprint[i] == 3){
            cells[i].classList.add('pac-man');
        }
    }
}
createBoard();
leftBtn.addEventListener('click',()=>{
    cells[pacmanIndex].classList.remove('pac-man');
    moveLeft();
    eatPellets()
    ifHitGhost()
    cells[pacmanIndex].classList.add('pac-man')
})
rightBtn.addEventListener('click',()=>{
    cells[pacmanIndex].classList.remove('pac-man');
        moveRight();
        eatPellets();
        ifHitGhost();
    cells[pacmanIndex].classList.add('pac-man')
})
upBtn.addEventListener('click',()=>{
    cells[pacmanIndex].classList.remove('pac-man');
        moveUp();
        eatPellets();
        ifHitGhost();
    cells[pacmanIndex].classList.add('pac-man')
})
downBtn.addEventListener('click',()=>{
    cells[pacmanIndex].classList.remove('pac-man');
        moveDown();
        eatPellets();
        ifHitGhost();
    cells[pacmanIndex].classList.add('pac-man')
})
function moveLeft(){
    if(pacmanIndex % width != 0 && !cells[pacmanIndex - 1].classList.contains('wall')){
        pacmanIndex -= 1;
    }
    else if(pacmanIndex == 420){
        pacmanIndex = 449;
    }
}
function moveRight(){
    if(pacmanIndex % width < width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')){
        pacmanIndex += 1;
    }
    else if(pacmanIndex == 449){
        pacmanIndex = 420}
}
function moveUp(){
    if(pacmanIndex - width  >= 0 && !cells[pacmanIndex - width].classList.contains('wall')){
        pacmanIndex -= width;
    }else if(pacmanIndex == 14){
        pacmanIndex = 854
    }
}
function moveDown(){
    if(pacmanIndex + width  < blueprint.length - 1 && !cells[pacmanIndex + width].classList.contains('wall')){
        pacmanIndex += width;
    }else if(pacmanIndex == 854){
        pacmanIndex = 14
    };
}
function movePacPac(e){
    cells[pacmanIndex].classList.remove('pac-man');
    switch(e.keyCode){  
        case 37:
            moveLeft();
           break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
           moveDown();
        }
    eatPellets();
    ifHitGhost();
    cells[pacmanIndex].classList.add('pac-man')
}
document.addEventListener('keyup', movePacPac);

function eatPellets(){
    if(cells[pacmanIndex].classList.contains('pellet')){
        cells[pacmanIndex].classList.remove('pellet')
    }
}
// ghost movements and creation
class Ghost{
    constructor(startIndex, name, speed){
        this.startIndex = startIndex,
        this.name = name,
        this.speed = speed
        this.ghostIndex = startIndex
        this.timer = NaN
    }
}

const ghosts = [
    new Ghost(463,'Deborah',400),
    new Ghost(465,'Temitope',250),
    new Ghost(462,'Issy', 300),
    new Ghost(466,'Francis',350)
]
ghosts.forEach((ghost)=>{
    cells[ghost.startIndex].classList.add('ghost');
    cells[ghost.startIndex].classList.add(ghost.name)
})

ghosts.forEach((ghost)=>moveGhost(ghost))
function moveGhost(ghost){
    ghost.timer = setInterval(()=>{
        if(!cells[ghost.ghostIndex + move].classList.contains('wall') && !cells[ghost.ghostIndex + move].classList.contains('ghost')){
            cells[ghost.ghostIndex].classList.remove(ghost.name,'ghost');
            ghost.ghostIndex += move;
            cells[ghost.ghostIndex].classList.add(ghost.name,'ghost');
        }else{
            move = moves[Math.floor(Math.random() * moves.length)];
        }
    },ghost.speed)
}

function ifHitGhost(){
    if(cells[pacmanIndex].classList.contains('ghost')){
        ghosts.forEach(ghost => clearInterval(ghost.timer));
        document.removeEventListener('keyup', movePacPac)
        console.log('game over')
    }
}

