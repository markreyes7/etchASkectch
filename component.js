const mainconatainer = document.getElementById("maincontainer");
const board = document.getElementById("toinsert");

var blackMode = null;
var colorMode = null;

var holding;

function makeRows(rows, cols,) {
    const container = document.createElement("div");
    if (checkExistance() == true){  //will prevent more than one board being displayed.
        return;
    }
    container.id = "container";
    board.appendChild(container);
    mainconatainer.appendChild(board);
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
        cell.addEventListener("mouseover", black, false);
    };
};

function freedraw(rows, cols){
    const container = document.createElement("div");
    if (checkExistance() == true){  //will prevent more than one board being displayed.
        return;
    }
    container.id = "freedraw";
    board.appendChild(container);
    mainconatainer.appendChild(board);
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";

        cell.addEventListener("mousedown", applyifheld, false);
        cell.addEventListener("mousemove",  applyFreeDrawBlack, false);
        cell.addEventListener("mouseup", donothing, false)
    };
};


function donothing(){
    holding = false
    console.log("up")
    console.log(holding)
}


 function colorchange(e){
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
 }




 function removeBoard(){
    let toBeRemoved = document.getElementById("container");
    let removeFreeDraw = document.getElementById("freedraw");
    if(document.body.contains(toBeRemoved)){
        board.removeChild(toBeRemoved);
    }
    else if (document.body.contains(removeFreeDraw)){
        board.removeChild(removeFreeDraw)
    }
}

function removeFreeDraw(){
    let toBeRemoved = document.getElementById("draw");
    board.removeChild(toBeRemoved);
}

function applyColors(){
    colorMode = true;
    blackMode = false
    var freedrawExists = document.getElementById('freedraw');
    if (holding = false){
        return;
    }
    else{
    let pixels = document.getElementsByClassName("grid-item");
    for (i = 0; i < pixels.length;i++){
        if(freedrawExists && colorMode){
            pixels[i].removeEventListener('mousemove', applyFreeDrawBlack, false);
            pixels[i].addEventListener('mousemove', applyFreeColor, false);
            pixels[i].addEventListener('mousedown', colorchange, false);
        }

        else{
            pixels[i].removeEventListener("mouseover", black, false );
            pixels[i].addEventListener("mouseover", colorchange, false);
            
        }
    
    }
}
}

function applyBlack(){
    blackMode = true;
    colorMode = false;
    let pixels = document.getElementsByClassName("grid-item");
    for (i = 0; i < pixels.length;i++){
        var exists = document.getElementById('freedraw');
        //check if the id is freedraw mode or etch a sketch mode. 
        if(exists && blackMode){
            pixels[i].addEventListener('mousedown', applyifheld, false);
            pixels[i].addEventListener('mousemove', applyFreeDrawBlack, false);
           
            pixels[i].removeEventListener('mousedown', colorchange, false);
        }
        else{
            pixels[i].removeEventListener('mouseover', colorchange, false);
            pixels[i].addEventListener('mouseover', black, false);
        }
    }
}

function checkExistance(){
    if(document.body.contains(document.getElementById('container') || document.getElementById("freedraw"))){
        alert('You already have a board!')
        return true;
    }
    else{alert('Creating a board......')}
    return false;
}

function black(e){
    e.target.style.backgroundColor = 'black';
}

function applyFreeDrawBlack(e){
    if (holding == true){
        e.target.style.backgroundColor = 'black';
       
    }
}

function applyFreeColor(e){
    if(holding == true){
       colorchange(e);
    }
}

function applyifheld(e){
    holding = true;

    if (holding == true && blackMode){
        e.target.style.backgroundColor = "black";
    }
    
}
