let player_number = 4

function getField(field_size) {
    array = Array.from(Array(field_size).keys())
    new_array = []
    for (x in array) {
        new_array.push("board" + array[x])
    }
    return new_array
}

var dogBoard;
var cards;
var playerStats;
var startGameField;
$(document).ready(function () {

    dogBoard = new Vue({
        el: 'dogBoard',
        template:`
            <table v-if="seen" class="customTable">
                <thead>
                    <tr>
                        <th v-for="cell in boardArray"> 
                            <div class="cellHeader">
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>  
                    <td v-for="cell in boardArray">
                        <div>
                            <button :id="cell" class="field"><img src class="img-fluid  shadow-lg" alt="Example image" loading="lazy"></button>
                        </div>                
                    </td>
                </tbody>
            </table>
        `,
        data: {
            boardArray: getField(20),
            seen: false
        }
        
    })

    cards = new Vue({
        el: 'playerCardSection',
        template: `
            <div v-if="seen" class="container py-4" >
                <div class="px-4 pt-5 my-5 text-center border-bottom">
                    <h1 class="display-4 fw-bold" id="player_name">CurrentPlayerCards: P1</h1>
                    <div class="col-lg-6 mx-auto">
                        <p class="lead mb-4">Choose Your Cards</p>

                    </div>

                    <div class="overflow" >
                        <div class="container px-5">
                            <div class="album py-5 bg-light">
                                <div class="container">
                                    <div class="row playCards row-cols-1 row-cols-sm-2 row-cols-md-3 g-4" id="player_cards">

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        `,
        data: {
            seen: false
        }
    })

    playerStats = new Vue ({
        el: '#playerStatsSection',
        data: {
            seen: false
        }
    })

    startGameField = new Vue ({
        el: '#startGameField',
        data: {
            seen: true,
            players: "4",
            amountCards: "6",
            sizeBoard: "20"
        },

        methods: {
            submitForm() {
                startGame(this.$data.amountCards, this.$data.players, this.$data.sizeBoard)
                startGameField.$data.seen = false
                console.log(playerStats)
                playerStats.$data.seen = true
                cards.$data.seen = true
                dogBoard.$data.boardArray = getField(parseInt(this.$data.sizeBoard))
                dogBoard.$data.seen = true
            }
        }
    })
})