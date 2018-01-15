$(document).ready(function() {
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate ', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean ', 'itant eate anot eat nato inate eat anot tain eat ', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let letters = [];
    let spot = 0;
    let currentSpot = 0;
    let time = new Date().getTime()/1000;
    let numberMistakes = 0;
    let restart = false;

    // This hides the lowercase keys when shift is down 
    $(document).keydown(function(event) {
        if (event.which === 16) {
            lowerKeys();
            upperKeys();
        }
    })

    // This brings back the lowercase keys when shift is up
    $(document).keyup(function(event) {
        if (event.which === 16) {
            upperKeys();
            lowerKeys();
        }
        $('.well').css('background-color', '#f5f5f5');
    })

    // Recognizes all key presses
    $(document).keypress(function(event) {
        $(`.well#${event.which}`).css('background-color', 'cyan');
        if(letters[spot] === String.fromCharCode(event.which)) {
            spot++;
            $('div#feedback').append('<font color="green">\u2714</font>')
            $('div#yellow-block').animate({
                left: '+=17.35'
            }, 0, function() {
                // nothing here
            });
            $('div#target-letter').text(letters[spot])
            if(spot === letters.length) {
                currentSpot++;
                resetGame(currentSpot);
            } 
        } else {
            $('div#feedback').append('<font color="red">\u2718</font>');
            numberMistakes++;
        }
        if (restart && String.fromCharCode(event.which) === 'y') {
            window.location.reload();
        }
    })

    // Hides the uppercase keyboard on startup
    $(function() {
        $('#keyboard-upper-container').hide();
    })

    // This section takes care of swapping between the two keyboards
    // Below, the two functions lowerKeys and upperKeys initiate a toggle
    function lowerKeys() {
        $('#keyboard-lower-container').toggle();
    }

    function upperKeys() {
        $('#keyboard-upper-container').toggle();
    }

    // In charge of resetting the game
    function resetGame (index) {
        if (index < sentences.length) {
            letters = sentences[index].split('');
            spot = 0;
            $('div#sentence').text(sentences[index]);
            $('div#target-letter').text(letters[0]);
            $('div#yellow-block').animate ({
                left: '17.35'
            }, 0, function() {
                // nothing here
            })
            $('div#feedback').text('');
        } else {
            calScore();
        }
    }
    resetGame(0);

    // This calculates the WPM
    function calScore () {
        let time2 = new Date().getTime()/1000;
        let wordCount = 0;
        let trueTime = time2 - time;
        for (i = 0; i < sentences.length; i++) {
            wordCount += sentences[i].split(" ").length;
        }
        console.log(wordCount);
        $('div#feedback').text(wordCount / (60 / trueTime) - (2 * numberMistakes));
        window.setTimeout(playAgain, 3000);
    }

    // This brings up the 'Play again' prompt at the end of the game
    function playAgain() {
        $('div#feedback').text('Play again? Y/N')
        restart = true;
        //time = new Date().getTime()/1000;
    }
});
