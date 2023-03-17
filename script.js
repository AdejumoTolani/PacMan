const board = document.querySelector('.board');
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

function movePacPac(e){
    cells[pacmanIndex].classList.remove('pac-man');
    switch(e.keyCode){
        
        case 37:
            if(pacmanIndex % width != 0 && !cells[pacmanIndex - 1].classList.contains('wall')){
                pacmanIndex -= 1;
                console.log(e)
            }
            else if(pacmanIndex == 420){
                pacmanIndex = 14;
            }break;
        case 38:
            if(pacmanIndex - width  >= 0 && !cells[pacmanIndex - width].classList.contains('wall')){
                pacmanIndex -= width;
            }break;
        case 39:
            if(pacmanIndex % width < width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')){
                pacmanIndex += 1;
            }
            else if(pacmanIndex == 449){
                pacmanIndex = 420}break;
        case 40:
            if(pacmanIndex + width  < width * width && !cells[pacmanIndex + width].classList.contains('wall')){
                pacmanIndex += width;
            }break;
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
    new Ghost(462,'Issy', 300),
    new Ghost(463,'Deborah',400),
    new Ghost(465,'Temitope',450),
    new Ghost(466,'Francis',500)
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

