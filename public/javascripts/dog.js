
selectedState = []

function initListener() {
    document.querySelectorAll(".field").forEach((field) => {
        field.addEventListener('click', function () {
                request(field.id, this);
        })
    })
    document.querySelectorAll('button[name="card"]').forEach((field) => {
   
        field.addEventListener('click', function () {
            if(selectedState.length > 0){
                requestSelection(selectedState[0].piece, this);
            } else{
                requestSelection(0, this);
            }
        });
    });
    document.querySelectorAll('button[name="swap"]').forEach((field) => {
   
        field.addEventListener('click', function () {
            if (selectedState.length == 2){
                requestSwap(this);
            } else {
                alert('invalid move')
            }
        });
    });
    document.querySelectorAll('button[name="startGame"]').forEach((field) => {
        field.addEventListener('click', function () {
            startGame();
        });
    });
    document.querySelectorAll('input[class="form-control front"]').forEach((field) => {
        field.addEventListener('input', function () {
            if (this.name == "amountPieces") {
                amountPieces = this.value
            } else if (this.name == "amountCards") {
                amountCards = this.value
            } else if (this.name == "sizeBoard") {
                sizeBoard = this.value
            }
        });
    });
}

amountCards = 4
amountPieces = 6
sizeBoard = 20

function startGame(element) {
    $.ajax({
        method: "GET",
        url: "/newGame/" + amountPieces +"/" + amountCards + "/" + sizeBoard,
        dataType: "html",

        success: function (result) {
            document.body.innerHTML = result;
            refreshDom();
        }
    });
}

function refreshDom() {
    selectedState = [];
    initListener();
}

function updateDOM(player) {
    player.players.forEach(ply => {
        const color = ply.color;
        ply.pieces.forEach(piece => {
            const pos = piece.piece_pos;
            console.log(piece.piece_pos)
            // TODO alle die nicht aufm Spielfeld sind ignorieren. HomePos ist immer da. deshalb sind initial spieler aufm feld
            $(`#${pos}`).html(getFieldHtml(color, pos))
        })
    })
}

function getFieldHtml(color, pos) {
    switch(color) {
        case 'red':
            return `<img src="/assets/images/icons/red.png" class="img-fluid  shadow-lg" alt="Example image" loading="lazy">`
          break;
        case 'blau':
            return `<img src="/assets/images/icons/blau.png" class="img-fluid  shadow-lg" alt="Example image" loading="lazy">`
          break;
        case 'yellow':
            return `<img src="/assets/images/icons/yellow.png" class="img-fluid  shadow-lg" alt="Example image" loading="lazy">`
        break;
        case 'white':
            return `<img src="/assets/images/icons/white.png" class="img-fluid  shadow-lg" alt="Example image" loading="lazy">`
            break;
        case 'green':
            return `<img src="/assets/images/icons/green.png" class="img-fluid  shadow-lg" alt="Example image" loading="lazy">`
        break;
        default:
          return `<img src="/assets/images/icons/field.png" class="img-fluid  shadow-lg" alt="Example image" loading="lazy">`
      } 
}

function requestSelection( pieceNum, element) {
 
    return $.ajax({
        method: "POST",
        url: "/selectCardAndPiece",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "cardNum": element.id,
            "cardOption": element.value,
            "pieceNum": pieceNum
        }),
        success: function (result) {
            //document.body.innerHTML = result;
            console.log(JSON.stringify(result))
            updateDOM(result)
        }
    });
}

function requestSwap(element) {
    $.ajax({
        method: "GET",
        url: `/selectSwap/${element.id}/${selectedState[1].playerIdx}/${selectedState[0].piece}/${selectedState[1].piece}`,
        dataType: "html",

        success: function (result) {
            document.body.innerHTML = result;
            refreshDom();
        }
    });

}

function request(fieldIdx, element) {
    $.ajax({
        method: "GET",
        url: '/isOwnPiece/' + fieldIdx,
        dataType: "json",
        
        success: function (result) {
            const array = result.isOwnPiece.split(" ");
            console.log("sas", array);
            selection(array, fieldIdx, element)
        }
    });
}

function selection(state, fieldIdx,  element){
    selectedState;

    if (selectedState.length == 2) {
        selectedState.forEach((selectedEl) => {
            $(`#${selectedEl.fieldIdx}`).css("background-color", "transparent");
        })
        selectedState = [];
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

class Board {
    constructor() {
        this.size = 0;
    }

    fill(json) {
        this.size = json.boardSize
    }
}

class Players {
    constructor() {
        this.numPlayers = 0;
        this.players = [];
        this.currentPlayer = 0;
    }

    fill(json) {
        console.log("players")
        this.numPlayers = json.playerNumber;
        this.currentPlayer = json.currentPlayer;
        this.players = [];
        let index = 0
        for (var player in json) {
            players[index] = new Player(player.playerIdx,
                player.name,
                player.color,
                player.homePosition,
                player.pieces,
                player.garage,
                player.house);
            index += 1;
        }
        
    }
}


class Player {
    constructor(playerIdx, name, color, home, pieces, garage, house) {
        this.name = name;
        this.playerIdx = playerIdx;
        this.color = color;
        this.home = home;
        this.pieces = pieces;
        this.garage = garage;
        this.house = house;
    }
}

let board = new Board()

function loadJsonAndUpdateDom() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(JSON.stringify(result))
            
            //board = new Board();
            //players = new Players();
            //board.fill(result);
            //players.fill(result);

            refreshDom();
        }
    });
}

$(document).ready(function () {
    console.log("Document is ready, filling grid")
    loadJsonAndUpdateDom();

    initListener();
});

