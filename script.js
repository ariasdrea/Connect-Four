(function() {
    var currentPlayer = "player1";
    var banner = $(".banner");
    var button = $("button");
    var victories = [
        //DIAGONAL LEFT -> RIGHT / TOP -> BOTTOM
        [2, 9, 16, 23],
        [1, 8, 15, 22, 29],
        [0, 7, 14, 21, 28, 35],
        [6, 13, 20, 27, 34, 41],
        [12, 19, 26, 33, 40],
        [18, 25, 32, 39],

        //DIAGONAL LEFT -> RIGHT / BOTTOM -> TOP
        [3, 8, 13, 18],
        [4, 9, 14, 19, 24],
        [5, 10, 15, 20, 25, 30],
        [11, 16, 21, 26, 31, 36],
        [17, 22, 27, 32, 37],
        [23, 28, 33, 38],

        //MIDDLE, RIGHT -> LEFT
        [18, 13, 8, 3],
        [24, 19, 14, 9, 4],
        [30, 25, 20, 15, 10, 5],
        [36, 31, 26, 21, 16, 11],
        [37, 32, 27, 22, 17],
        [38, 33, 28, 23],

        //MIDDLE, BOTTOM -> TOP
        [23, 16, 9, 2],
        [29, 22, 15, 8, 1],
        [35, 28, 21, 14, 7, 0],
        [41, 34, 27, 20, 13, 6],
        [40, 33, 26, 19, 12],
        [39, 32, 25, 18]
    ];

    // SOUND FUNCTION
    function Sound() {
        this.sound = $("audio").get(0);
        this.play = function() {
            this.sound.play();
        };
    }

    var newSound = new Sound();

    $(".column").on("click", function(e) {
        var col = $(e.currentTarget);
        var slotsInColumn = col.find(".slot");
        var i;

        for (i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                // console.log(i); counts down number from inside 1 column
                break;
            }
        }

        slotsInColumn.eq(i).addClass(currentPlayer);
        newSound.play();

        // CHECKS VICTORY IN COLUMN / VERTICALLY
        if (checkForVictory(slotsInColumn)) {
            banner.css("opacity", "0.85");
            banner.css("transitionDuration", "1s");
            banner.css("transform", "translate(-50%, -50%)");
            banner.css(
                "backgroundImage",
                "url(https://media.giphy.com/media/l1J3DaHzWEp2bTpYs/giphy.gif)"
            );
            banner.css("backgroundSize", "cover");
            banner.css("color", "white");
            button.css("cursor", "pointer");
            button.on("click", function() {
                location.reload();
            });
            $(".column").off("click");

            if (currentPlayer == "player1") {
                banner.append("Player 1 Wins!");
            } else {
                banner.append("Player 2 Wins!");
            }
        }

        //CHECKS VICTORY IN ROW / HORIZONTALLY
        if (checkForVictory($(".row" + i))) {
            banner.css("opacity", "0.85");
            banner.css("transitionDuration", "1s");
            banner.css("transform", "translate(-50%, -50%)");
            banner.css(
                "backgroundImage",
                "url(https://media.giphy.com/media/yc67bWV0fcvMk/giphy.gif)"
            );
            banner.css("backgroundSize", "cover");
            banner.css("color", "white");
            button.css("cursor", "pointer");
            button.on("click", function() {
                location.reload();
            });

            $(".column").off("click");

            if (currentPlayer == "player1") {
                banner.append("Player 1 Wins!");
            } else {
                banner.append("Player 2 Wins!");
            }
        }

        //CHECKS VICTORY IN DIAGONAL
        (function diagonal() {
            var strb = "";
            for (var i = 0; i < victories.length; i++) {
                strb = "";
                for (var j = 0; j < victories[i].length; j++) {
                    if (
                        $(".slot")
                            .eq(victories[i][j])
                            .hasClass(currentPlayer)
                    ) {
                        strb += "v";
                    } else {
                        strb += "x";
                    }
                }

                if (strb.indexOf("vvvv") > -1) {
                    banner.css("opacity", "0.85");
                    banner.css("transitionDuration", "1s");
                    banner.css("transform", "translate(-50%, -50%)");
                    banner.css(
                        "backgroundImage",
                        "url(https://media.giphy.com/media/l2R06dnvHyg7ReuTS/giphy.gif)"
                    );
                    banner.css("backgroundSize", "contain");
                    banner.css("color", "white");
                    button.css("cursor", "pointer");
                    button.on("click", function() {
                        location.reload();
                    });
                    $(".column").off("click");

                    if (currentPlayer == "player1") {
                        banner.append("Player 1 Wins!");
                    } else {
                        banner.append("Player 2 Wins!");
                    }
                    return;
                }
            }
        })();

        //SWITCH PLAYERS
        switchPlayers();
    });
    //END OF CLICK EVENT

    // SWITCH PLAYERS FUNCTION
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    // VICTORY FUNCTION
    function checkForVictory(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                str += "v";
            } else {
                str += "x";
            }
        }
        if (str.indexOf("vvvv") > -1) {
            // console.log("You Won!");
            return true;
        }
    }
})();
