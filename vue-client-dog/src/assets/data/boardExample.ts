const board = {
    "boardSize": 20,
    "playerNumber": 4,
    "currentPlayer": 2,
    "players": [
        {
            "player index": 0,
            "name": "P1",
            "color": "yellow",
            "homePosition": 0,
            "pieces": [
                {
                    "piece_idx": 0,
                    "piece_pos": 14
                },
                {
                    "piece_idx": 1,
                    "piece_pos": 0
                },
                {
                    "piece_idx": 2,
                    "piece_pos": 0
                },
                {
                    "piece_idx": 3,
                    "piece_pos": 0
                }
            ],
            "garage": [
                {
                    "garage_idx": 0,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 1,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 2,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 3,
                    "garage_piece": -1
                }
            ],
            "house": [
                {
                    "inHouse": 1
                },
                {
                    "inHouse": 2
                },
                {
                    "inHouse": 3
                }
            ],
            "cards": [
                {
                    "card_symbol": "3"
                },
                {
                    "card_symbol": "10"
                },
                {
                    "card_symbol": "8"
                }
            ]
        },
        {
            "player index": 1,
            "name": "P2",
            "color": "white",
            "homePosition": 5,
            "pieces": [
                {
                    "piece_idx": 0,
                    "piece_pos": 5
                },
                {
                    "piece_idx": 1,
                    "piece_pos": 5
                },
                {
                    "piece_idx": 2,
                    "piece_pos": 5
                },
                {
                    "piece_idx": 3,
                    "piece_pos": 5
                }
            ],
            "garage": [
                {
                    "garage_idx": 0,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 1,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 2,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 3,
                    "garage_piece": -1
                }
            ],
            "house": [
                {
                    "inHouse": 1
                },
                {
                    "inHouse": 2
                },
                {
                    "inHouse": 3
                }
            ],
            "cards": [
                {
                    "card_symbol": "questionmark"
                },
                {
                    "card_symbol": "questionmark"
                },
                {
                    "card_symbol": "10"
                }
            ]
        },
        {
            "player index": 2,
            "name": "P3",
            "color": "green",
            "homePosition": 10,
            "pieces": [
                {
                    "piece_idx": 0,
                    "piece_pos": 12
                },
                {
                    "piece_idx": 1,
                    "piece_pos": 10
                },
                {
                    "piece_idx": 2,
                    "piece_pos": 10
                },
                {
                    "piece_idx": 3,
                    "piece_pos": 10
                }
            ],
            "garage": [
                {
                    "garage_idx": 0,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 1,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 2,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 3,
                    "garage_piece": -1
                }
            ],
            "house": [
                {
                    "inHouse": 1
                },
                {
                    "inHouse": 2
                },
                {
                    "inHouse": 3
                }
            ],
            "cards": [
                {
                    "card_symbol": "questionmark"
                },
                {
                    "card_symbol": "6"
                },
                {
                    "card_symbol": "2"
                },
                {
                    "card_symbol": "7"
                }
            ]
        },
        {
            "player index": 3,
            "name": "P4",
            "color": "red",
            "homePosition": 15,
            "pieces": [
                {
                    "piece_idx": 0,
                    "piece_pos": 1
                },
                {
                    "piece_idx": 1,
                    "piece_pos": 15
                },
                {
                    "piece_idx": 2,
                    "piece_pos": 15
                },
                {
                    "piece_idx": 3,
                    "piece_pos": 15
                }
            ],
            "garage": [
                {
                    "garage_idx": 0,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 1,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 2,
                    "garage_piece": -1
                },
                {
                    "garage_idx": 3,
                    "garage_piece": -1
                }
            ],
            "house": [
                {
                    "inHouse": 1
                },
                {
                    "inHouse": 2
                },
                {
                    "inHouse": 3
                }
            ],
            "cards": [
                {
                    "card_symbol": "swapCard"
                },
                {
                    "card_symbol": "questionmark"
                },
                {
                    "card_symbol": "6"
                },
                {
                    "card_symbol": "9"
                }
            ]
        }
    ]
}

export default board;