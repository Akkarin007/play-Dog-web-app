let size = 9
let blocksize = 3

class GameState {
    
    selectedState = [];

}


function initListener(gameState) {
    document.querySelectorAll(".field").forEach((field) => {
        field.addEventListener('click', function () {
                request(field.id, gameState, this);
        })
    })
}

function request(fieldIdx, gameState, element) {
    fetch('/isOwnPiece/' + fieldIdx, {
        method: 'get',
    }).then((resp) => {
        resp.text().then((text) => {
            const array = text.split(" ");
            selection(array, fieldIdx, gameState, element)
        })
    })
}

function selection(state, fieldIdx, gameState, element){
    const selectedState = gameState.selectedState;

    if (selectedState.length == 2) {
        selectedState.forEach((selectedEl) => {
            $(`#${selectedEl.fieldIdx}`).css("background-color", "transparent");
        })
        gameState.selectedState = [];
    } else if (!selectedState.find(function (selection) { return selection.fieldIdx === fieldIdx })) {
        
        if(state[0] == "true" && selectedState.length === 0 || state[0] == "false" && selectedState.length === 1) {
            const stateObj = getStateObj(state, fieldIdx);
            selectedState.push(stateObj);
            element.style.backgroundColor = 'goldenrod';
        } else {
            alert("invalid selection!")
        }
    }
}

function getStateObj(state, fieldIdx){
    return {
        fieldIdx: fieldIdx,
        selectedPiece: state[1],
        piece: state[1],
        playerIdx: state[2],
    }
}

$(document).ready(function () {
    console.log("Document is ready, filling grid")
    const gameState = new GameState();

    initListener(gameState);
    request();
});

