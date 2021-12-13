import boardInit from "./boardExample";
import Vue from "vue";

let board: any = boardInit;
export const numb = Vue.observable({board});
export const fieldObs = Vue.observable({field: {}})
export const inHouseObs = Vue.observable({inHouse: {}})
export const garageObs = Vue.observable({garage: {}})



export function loadJsonAndUpdateDom(result:any) {
    numb.board = result;
    field(result);
    garage(result);
    inHouse(result);
}

export function getBoard() {
    
    return board;
}


export function inHouse(board: any) {
    const currentPlayer = board.currentPlayer;
    let houseArray:any = [];
    const activeHouses = board.players[currentPlayer].house.length;
    const amoutOfPieces = board.players[currentPlayer].pieces.length;
    let counter = 0;
    for (let i = 0; i < activeHouses; i++) {
        const img = require(`../images/icons/${board.players[currentPlayer].color}.png`)
        houseArray.push({ image: img, id: `houseId${counter++}`})
    }

    for (let i = 0; i < amoutOfPieces - activeHouses; i++) {
        const img = require(`../images/icons/field.png`)
        houseArray.push({ image: img, id: `houseId${counter++}`})
        
    }
    inHouseObs.inHouse = houseArray;
    return houseArray
}


export function garage(board: any) {
    const currentPlayer = board.currentPlayer;
    const amoutOfPieces = board.players[currentPlayer].pieces.length;
    let garage:any = new Array<object>(amoutOfPieces);
    const garageArray = board.players[currentPlayer].garage;

    for (let i = 0; i < garageArray.length; i++) {
        const pos = garageArray[i].garage_piece;
        if(pos === -1) {
            const img = require(`../images/icons/field.png`)
            garage[i] = { image: img, id: `garageId${i}`}
        }else{
            const img = require(`../images/icons/${board.players[currentPlayer].color}.png`)
            garage[pos] = { image: img, id: `garageId${i}`}
        }
    
    }
        
    garageObs.garage = garage;
    return garage
}

export function field(board:any):any {
    const boardSize = board.boardSize;
    const pieceArray = board.players.map((player: any) => {
        const pieces = player.pieces.filter((piece: any) => {
            let bool = true;
            player.house.forEach((house: any) => {
                if(piece.piece_idx === house.inHouse){
                    bool = false;
                }
            })
            return bool;
        });
        return { color: player.color, pieces: pieces }
    })

    let boardArray = new Array<object>(boardSize);

    for (let playerIdx = 0; playerIdx < board.playerNumber; playerIdx++) {
        pieceArray[playerIdx].pieces.map((piece: any) => {
            const img = require(`../images/icons/${pieceArray[playerIdx].color}.png`)
            boardArray[piece.piece_pos] = { image: img, pos: piece.piece_pos }
        });
    }

    for (let i = 0; i < boardSize; i++) {
        if (!boardArray[i]) {
            const img = require(`../images/icons/field.png`)
            boardArray[i] = ({ image: img, pos: i })
        }
    }
    fieldObs.field = boardArray;
    return boardArray;
}

export default getBoard;