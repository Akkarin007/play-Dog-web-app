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
        url: "/newGame/" + amountCards +"/" + amountPieces + "/" + sizeBoard,
        dataType: "html",

        success: function (result) {
            document.body.innerHTML = result;
            loadJsonAndUpdateDom();
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
            loadJsonAndUpdateDom()
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

function createPlayerCardsPanel(cards) {
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

function updateBoard(board) {

    // TODO: remove old pieces on board

    // TODO: add new pieces on Board

    // TODO: replace new card output
    const new_cards = createPlayerCardsPanel(board.players[board.currentPlayer].cards)
    $(".playerCards").html(new_cards)
    // TODO: replace playername


}

class Board {
    constructor() {
        this.size = 0;
        this.numPlayers = 0;
        this.players = [];
        this.currentPlayer = 0;
    }

    fill(json) {
        console.log("players")
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

function loadJsonAndUpdateDom() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(JSON.stringify(result))
            board = new Board();
            board.fill(result);
            console.log(board);
            updateBoard(board);
            refreshDom();
        }
    });
}

$(document).ready(function () {
    console.log("Document is ready, Filling Board!")
    loadJsonAndUpdateDom();
    initListener();
});

