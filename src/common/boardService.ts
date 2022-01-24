import Vue from "vue";
import { getCurrentLobbyID } from "./board";
import { getWebSocket } from "./websocket";


let selectedState: any[] = [];


export const selectionObs = Vue.observable({ selectedState });


export function selectCardAndPiece(cardNum: number, cardOption: number, pieceNum: number) {

    const lobbyID = getCurrentLobbyID()
    var data;
    if (selectedState.length > 0) {
        data = JSON.stringify({
            "type": "request",
            "lobbyID": lobbyID,
            "cardNum": cardNum.toString(),
            "cardOption": cardOption.toString(),
            "pieceNum": selectedState[0].piece
        })
    } else {
        data = JSON.stringify({
            "type": "request",
            "lobbyID": lobbyID,
            "cardNum": cardNum.toString(),
            "cardOption": cardOption.toString(),
            "pieceNum": 0
        })
    }
    getWebSocket().send(data);
    resetSelection();
}

function resetSelection() {
    selectionObs.selectedState = []
    selectedState = [];
}
export function selection(state: any, fieldIdx: any) {

    console.log(state, selectedState.length);
    if (selectedState.length == 2) {
        resetSelection()
    } else if (!selectedState.find((selection: any) => { return selection.fieldIdx === fieldIdx })) {

        if (state[0] == true && selectedState.length === 0 || state[0] == false && selectedState.length === 1) {
            console.log('I AM IND')
            const stateObj = getStateObj(state, fieldIdx);
            selectedState.push(stateObj);
            selectionObs.selectedState = selectedState;
        } else {
            resetSelection();
            alert("invalid selection!")
        }
    }
}

function getStateObj(state: any, fieldIdx: any) {
    return {
        fieldIdx: fieldIdx,
        selectedPiece: parseInt(state[1]),
        piece: parseInt(state[1]),
        playerIdx: parseInt(state[2]),
    }
}

export function swapCard(cardNum: number) {
    const lobbyID = getCurrentLobbyID()
    if (selectionObs.selectedState.length == 2) {
        var data = JSON.stringify({
            "type": "swap",
            "lobbyID": lobbyID,
            "cardNum": cardNum.toString(),
            "otherPlayer": selectionObs.selectedState[1].playerIdx,
            "pieceNum1": selectionObs.selectedState[0].piece,
            "pieceNum2": selectionObs.selectedState[1].piece
        });
        console.log('SENNNDDD', data)
        getWebSocket().send(data);
    }

    resetSelection();
}