import {loadJsonAndUpdateDom} from "./board";

let localhost = 'ws://localhost:9000/websocket'
let prod_host = 'ws://sheltered-depths-36109.herokuapp.com/websocket'

let websocket = new WebSocket(localhost);


export default function connectWebSocket() {
    websocket = new WebSocket(localhost);

    websocket.onopen = function(event:any) {
        console.log("Connected to Websocket");
    }

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error:any) {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = function (e:any) {
        if (typeof e.data === "string") {
            console.log("BoardChanged! - Websocket Push receiverd!")
            console.log(JSON.stringify(JSON.parse(e.data)))
            loadJsonAndUpdateDom(JSON.parse(e.data))
        }
    };
    websocket = websocket;
    return websocket;
}

export function getWebSocket() {
    return websocket
}


