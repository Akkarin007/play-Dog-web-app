
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
}

function refreshDom() {
    selectedState = [];
    initListener();
}

function requestSelection( pieceNum, element) {
    $()
    fetch(`/selectCardAndPiece/${element.id}/${element.value}/${pieceNum}`, {
        method: 'get',
    }).then((resp) => {
        resp.text().then((text) => {
            document.body.innerHTML = text;
            refreshDom()
        });
    })
}

function requestSwap(element) {
    fetch(`/selectSwap/${element.id}/${selectedState[1].playerIdx}/${selectedState[0].piece}/${selectedState[1].piece}`, {
        method: 'get',
    }).then((resp) => {
        if(resp.ok){
            resp.text().then((text) => {
                document.body.innerHTML = text;
                refreshDom()
            });
        }
    })
}

function request(fieldIdx, element) {
    fetch('/isOwnPiece/' + fieldIdx, {
        method: 'get',
    }).then((resp) => {
        resp.text().then((text) => {
            const array = text.split(" ");
            selection(array, fieldIdx, element)
        })
    })
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
        this.numPlayers = json.playerNumber;
        this.currentPlayer = json.currentPlayer;
        this.players = [];
        let index = 0
        for (var player in json) {
            players[index] = new Player(player.playerIdx,
                player.name,
                player.color,
                player.playerHome,
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
let players = new Players()


function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            board = new Board();
            players = new Players();
            board.fill(result);
            players.fill(result);
        }
    });
}

$(document).ready(function () {
    console.log("Document is ready, filling grid")
    loadJson();
    initListener();
});

