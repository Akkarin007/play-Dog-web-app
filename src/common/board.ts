
import Vue from "vue";
import boardInit from "../assets/data/boardExample";

let board: any = boardInit;
export const boardObs = Vue.observable({ board });
export const fieldObs = Vue.observable({ field: {} });
export const inHouseObs = Vue.observable({ inHouse: {} });
export const garageObs = Vue.observable({ garage: {} });
export const cardObs = Vue.observable({ cards: {} });

export const lobbiesObs = Vue.observable({ lobbies: [{ lobbyPlayers: [{ playerName: '' }], lobbyID: '', lobbySize: 0, lobbyInGame: false }] });
loadJsonAndUpdateDom(boardInit);

let currentLobbyID = "default"
let activePlayer = "unknown user"

export function setCurrentLobbyID(id: string) {
    currentLobbyID = id;
}

export function getCurrentLobbyID() {
    return currentLobbyID;
}

export function setActivePlayer(name: string) {
    activePlayer = name;
}

export function getActivePlayer() {
    return activePlayer;
}
export function loadJsonAndUpdateDom(result: any) {

    console.log('loadJson -> ', JSON.stringify(result))

    if (result.lobbies) {
        setLobbies(result)
    } else if (result.lobbyID = getCurrentLobbyID()) {
        boardObs.board = result;
        field(result);
        garage(result);
        inHouse(result);
        cards(result);
    }
}

export function getBoard() {

    return board;
}

function setLobbies(lobby: any) {
    lobbiesObs.lobbies = lobby.lobbies
    console.log('loadJson lobbies -> ', JSON.stringify(lobby.lobbies))
}


export function inHouse(board: any) {
    const playerCount = board.playerNumber;
    const allHouses = []

    for (let playerIdx = 0; playerIdx < playerCount; playerIdx++) {
        let houseArray: any = [];
        const activeHouses = board.players[playerIdx].house.length;
        const amoutOfPieces = board.players[playerIdx].pieces.length;
        let counter = 0;
        for (let i = 0; i < activeHouses; i++) {
            const img = require(`../assets/images/icons/${board.players[playerIdx].color}.png`)
            houseArray.push({ image: img, id: `houseId${counter++}` })
        }

        for (let i = 0; i < amoutOfPieces - activeHouses; i++) {
            const img = require(`../assets/images/icons/field.png`)
            houseArray.push({ image: img, id: `houseId${counter++}` })

        }
        allHouses.push({ name: `-> ${board.players[playerIdx].name}`, house: houseArray })
    }
    inHouseObs.inHouse = allHouses
    return allHouses
}


export function garage(board: any) {
    const allGarages = []
    const playerCount = board.playerNumber;


    for (let playerIdx = 0; playerIdx < playerCount; playerIdx++) {
        const garageArray = board.players[playerIdx].garage;

        const amoutOfPieces = board.players[playerIdx].pieces.length;
        let garage: any = new Array<object>(amoutOfPieces);
        for (let i = 0; i < garageArray.length; i++) {
            const pos = garageArray[i].garage_piece;
            if (pos === -1) {
                const img = require(`../assets/images/icons/field.png`)
                garage[i] = { image: img, id: `garageId${i}` }
            } else {
                const img = require(`../assets/images/icons/${board.players[playerIdx].color}.png`)
                garage[pos] = { image: img, id: `garageId${i}` }
            }

        }
        allGarages.push({ name: board.players[playerIdx].name, garage: garage })
    }

    garageObs.garage = allGarages;
    return allGarages
}

export function colorizedHouses(fieldIdx: number): string{
    
    const playerCount = boardObs.board.playerNumber;


    for (let playerIdx = 0; playerIdx < playerCount; playerIdx++) {
        const homePosition = boardObs.board.players[playerIdx].homePosition;
        if(fieldIdx === homePosition) {
            const color = boardObs.board.players[playerIdx].color
            return String(color)
        }
    }
    return 'transparent'
}

export function field(board: any): any {
    const boardSize = board.boardSize;
    const pieceArray = board.players.map((player: any) => {
        const pieces = player.pieces.filter((piece: any) => {
            let bool = true;
            player.house.forEach((house: any) => {
                if (piece.piece_idx === house.inHouse) {
                    bool = false;
                }
            })
            return bool;
        });
        return { color: player.color, pieces: pieces }
    })

    let fieldArray = new Array<object>(boardSize);

    for (let playerIdx = 0; playerIdx < board.playerNumber; playerIdx++) {
        pieceArray[playerIdx].pieces.map((piece: any) => {
            const color = pieceArray[playerIdx].color;
            const img = require(`../assets/images/icons/${color}.png`)
            fieldArray[piece.piece_pos] = { image: img, pos: piece.piece_pos, color: color, pieceIdx: piece.piece_idx, playerIdx: playerIdx }
        });
    }

    for (let i = 0; i < boardSize; i++) {
        if (!fieldArray[i]) {
            const img = require(`../assets/images/icons/field.png`)
            fieldArray[i] = ({ image: img, pos: i, color: '', pieceIdx: -1, playerIdx: -1 })
        }
    }
    fieldObs.field = fieldArray;
    return fieldArray;
}

export function isYourTurn() {
    const userIdx = getUser()
    const isTurn = userIdx === boardObs.board.currentPlayer
    console.log(isTurn)
    return isTurn
}

export function getUser() {
    let currentPlayer = 0;
    for (let i = 0; i < boardObs.board.playerNumber; i++) {
        if (boardObs.board.players[i].name === getActivePlayer()) {
            currentPlayer = Number(boardObs.board.players[i].playerIdx)
            return currentPlayer
        }
    }

    return currentPlayer
}

export function cards(board: any): any {

    let currentPlayer = getUser()
    let cardsArray: any = [];
    const cardsLength = board.players[currentPlayer].cards.length;
    for (let i = 0; i < cardsLength; i++) {
        const symbol = board.players[currentPlayer].cards[i].card_symbol;
        const img = require(`../assets/images/cards/${symbol}.png`)
        cardsArray.push({ image: img, id: `cardsId${i}`, symbol: symbol })
    }

    cardObs.cards = cardsArray;
    return cardsArray
}

export default getBoard;