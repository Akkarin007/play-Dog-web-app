selectedState = []

function initBasicListener() {
    document.querySelectorAll(".field").forEach((field) => {
        field.addEventListener('click', function () {
            selectAjax(field.id.replace("board", ""), this);
        })
    })
}

function initCardListeners() {
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

function resetSelection(){
    selectedState.forEach((selectedEl) => {
        $(`#board${selectedEl.fieldIdx}`).css("background-color", "transparent");
    })
    selectedState = [];
}

function initDom() {
    initCardListeners();
    resetSelection();
}

function requestSelection( pieceNum, element) {
    var data =JSON.stringify({
        "cardNum": element.id,
        "cardOption": element.value,
        "pieceNum": parseInt(pieceNum)
    })
    return $.ajax({
        method: "POST",
        url: "/selectCardAndPiece",
        dataType: "json",
        contentType: "application/json",
        data: data,
        success: function (result) {
            loadJsonAndUpdateDom(result)
        }
    });
}

function requestSwap(element) {
    var data = JSON.stringify({
        "cardNum": element.id,
        "otherPlayer": selectedState[1].playerIdx,
        "pieceNum1": selectedState[0].piece,
        "pieceNum2": selectedState[1].piece
    });
    $.ajax({
        method: "POST",
        url: '/selectSwap',
        dataType: "json",
        contentType: "application/json",
        data: data,

        success: function (result) {
            loadJsonAndUpdateDom(result);
        }
    });

}

function selectAjax(fieldIdx, element) {
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


    if (selectedState.length == 2) {
        resetSelection()
    } else if (!selectedState.find(function (selection) { return selection.fieldIdx === fieldIdx })) {
        
        if(state[0] == "true" && selectedState.length === 0 || state[0] == "false" && selectedState.length === 1) {
            const stateObj = getStateObj(state, fieldIdx);
            selectedState.push(stateObj);
            element.style.backgroundColor = 'goldenrod';
        } else {
            resetSelection();
            alert("invalid selection!")
        }
    }
}

function getStateObj(state, fieldIdx){
    return {
        fieldIdx: fieldIdx,
        selectedPiece: parseInt(state[1]),
        piece: parseInt(state[1]),
        playerIdx: parseInt(state[2]),
    }
}

function updatePlayerCardsPanel(cards) {
    var template_card = document.querySelector('#template_card');
    var template_button = document.querySelector('#template_card_buttons');

    if (template_card == null || template_button == null) {
        return
    }

    var target = document.querySelector("#player_cards");
    target.innerHTML = "";

    for (cardID in cards) {
        var card = document.importNode(template_card.content, true);
        // manipulate image
        //var x = card.querySelector("src").nodeValue[0] = "";
        
        //manipulate card Body
        card.querySelector(".card-text").innerHTML = cards[cardID];
        var button_root = card.querySelector(".card-body").childNodes[3];
        
        const str_arr = cards[cardID].split(" ")
        for (entry in str_arr) {
            // manipulate Button
            var button = document.importNode(template_button.content, true);
            if (str_arr[entry] == "swapCard") {
                button.querySelector("button").name = "swap";
            } else {
                button.querySelector("button").name = "card";
            }
            button.querySelector("button").id = cardID;
            button.querySelector("button").value = entry;
            button.querySelector("button").innerHTML = str_arr[entry];
            // join Buttons + card
            button_root.appendChild(button);
        }
        // move to table
        var target = document.querySelector("#player_cards");
        target.appendChild(card);
    }
}

function updatePlayerFigures(board) {
    for (player in board.players) {
        for (piece in board.players[parseInt(player)].piece_pos) {
            var piece_pos = board.players[parseInt(player)].piece_pos[parseInt(piece)]
            var field = document.querySelector("#board" + piece_pos)
            if (board.players[parseInt(player)].house.includes(parseInt(piece)) || board.players[parseInt(player)].garage.includes(parseInt(piece)) || field == null) {continue}
                field = field.querySelector("img")
                switch (board.players[parseInt(player)].color) {
                    case "red":
                        field.src = "/assets/images/icons/red.png";
                        break;
                    case "blau":
                        field.src = "/assets/images/icons/blau.png";
                        break;
                    case "yellow":
                        field.src = "/assets/images/icons/yellow.png";
                        break;
                    case "white":
                        field.src = "/assets/images/icons/white.png";
                        break;
                    case "green":
                        field.src = "/assets/images/icons/green.png";
                        break;
                    default:
                        break;
                }
        }
    }
}

function clearBoardFigures (size) {
    for (var x = 0; x < size; x++) {
        var field = document.querySelector("#board" + x)
        if (field == null) {return}
        field = field.querySelector("img")
        field.src = "/assets/images/icons/field.png"
    }

}

function updateGarage(board) {
    //TODO add after remodel of field
}

function updateCurrenPlayerName(name) {
    if (document.querySelector("#player_name") == null) {
        return
    }
    document.querySelector("#player_name").textContent = "CurrentPlayerCards: " + name
}

function updateBoard(board) {
    resetSelection()
    clearBoardFigures(board.size);
    updatePlayerFigures(board);
    updateGarage(board);
    updateCurrenPlayerName(board.players[board.currentPlayer].name);
    updatePlayerCardsPanel(board.players[board.currentPlayer].cards);
    
}


class Board {
    constructor() {
        this.size = 0;
        this.numPlayers = 0;
        this.players = [];
        this.currentPlayer = 0;
    }

    fill(json) {
        this.size = json.boardSize
        this.numPlayers = json.playerNumber;
        this.currentPlayer = json.currentPlayer;
        this.players = [];
        for (var player in json.players) {
            var house = [];
            var pieces = [];
            var garage = [];
            var cards = [];

            for (var t_house in json.players[parseInt(player)].house) {
                house.push(json.players[parseInt(player)].house[parseInt(t_house)].inHouse);
            }
            for (var t_pieces in json.players[parseInt(player)].pieces) {
                pieces.push(json.players[parseInt(player)].pieces[parseInt(t_pieces)].piece_pos);
            }
            for (var t_garage in json.players[parseInt(player)].garage) {
                garage.push(json.players[parseInt(player)].garage[parseInt(t_garage)].garage_piece);
            }
            for (var t_cards in json.players[parseInt(player)].cards) {
                cards.push(json.players[parseInt(player)].cards[parseInt(t_cards)].card_symbol);
            }
            this.players.push(new Player(json.players[parseInt(player)].playerIdx,
                json.players[parseInt(player)].name,
                json.players[parseInt(player)].color,
                json.players[parseInt(player)].homePosition,
                pieces,
                garage,
                house,
                cards));
        }
        
    }
}

class Player {
    constructor(playerIdx, name, color, home, pieces, garage, house, cards) {
        this.name = name;
        this.playerIdx = playerIdx;
        this.color = color;
        this.home = home;
        this.piece_pos = pieces;
        this.garage = garage;
        this.house = house;
        this.cards = cards;
    }
}

function loadJsonAndUpdateDom(result) {
    board = new Board();
    board.fill(result);
    updateBoard(board);
    initDom();
}

$(document).ready(function () {

    console.log("Document is ready, Filling Board!")

    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            loadJsonAndUpdateDom(result)
            initBasicListener();
        }
    });
    
});

