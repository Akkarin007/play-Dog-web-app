import {loadJsonAndUpdateDom} from "./board";

var websocket: WebSocket;

var websocket: WebSocket = new WebSocket("ws://localhost:9000/websocket");



export default function connectWebSocket() {
    websocket = new WebSocket("ws://localhost:9000/websocket");

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
    return websocket;
}


