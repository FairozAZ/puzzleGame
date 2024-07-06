// declering all global variable
const result = document.querySelector('#result');
const allImgCont = document.querySelectorAll('.img-container');
const timePos = document.querySelector('#time');
const gameStart = document.querySelector('#btnStr');
const sound = new Audio('./sound.wav');
let allowed = false;
let dragSrcElem = null;
let countSec = 30;
let setTimeId = null;

// time count
let countTime = () => {
    timePos.innerHTML = `Time remain: <b style="color:red;">${countSec}</b> seconds`;
    countSec--;
    if (countSec >= 0) {
        setTimeId = setTimeout(countTime, 1000);
    } else {
        clearTimeout(setTimeId);
        result.innerHTML = `<b style='color:red;'>Times up</b>`;
        allowed = false;
    }
}

// matching images & winning message
function checkWin () {
    const allImg = document.querySelectorAll('img');
    let adjustImg = allImg[0].src.includes('slice1')
        && allImg[1].src.includes('slice2') && allImg[2].src.includes('slice3')
        && allImg[3].src.includes('slice4') && allImg[4].src.includes('slice5') 
        && allImg[5].src.includes('slice6') && allImg[6].src.includes('slice7')
        && allImg[7].src.includes('slice8') && allImg[8].src.includes('slice9');
    if(adjustImg){
        result.innerHTML = `<b style='color:lightgreen;'>Congratulation! You won the Game.</b>`;
        clearTimeout(setTimeId);
        allowed = false;
    }
}

// images that will be dragged
function imgStartDrag (e) {
    if (allowed) {
        dragSrcElem = this;
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
}

// where all images will be dropped
function imgDragOver (ev) {
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    return false;
}

// when dropping occurs
function imgDropOn (evt) {
    if (dragSrcElem != this) {
        if (allowed) {
            dragSrcElem.innerHTML = this.innerHTML;
            this.innerHTML = evt.dataTransfer.getData('text/html');
            sound.play();
            // calling matching & winning function
            checkWin();
        }
        return false;
    }
}
 
// calling all function handler
allImgCont.forEach (function (item) {
    item.addEventListener('dragstart', imgStartDrag);
    item.addEventListener('dragover', imgDragOver);
    item.addEventListener('drop', imgDropOn);
});

// Display time and allow dragging images
gameStart.addEventListener('click', () => {
    allowed = true;
    if (!setTimeId) {     
        countTime();
    }
});
