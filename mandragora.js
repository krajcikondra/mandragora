document.addEventListener("DOMContentLoaded", function(event) {
    var items = document.getElementsByClassName('item');
    for(var i = 0; i < items.length; i++) {
        var anchor = items[i];
        anchor.onclick = function() {
            play(this.dataset.name);
        }
    }

    var audio = null;
    let score = Number(localStorage.getItem('score'));
    function increaseScore(scorePoints) {
        score += scorePoints;
        localStorage.setItem('score', score);
    }

    function getRank() {
        if (score > 10000) {
            return 'Stará ojetá šlapka kterou nikdo nehce';
        } else if (score > 5000) {
            return 'Stará ojetá šlápota';
        } else if (score > 2500) {
            return 'Stará šlapka';
        } else if (score > 2000) {
            return 'Šlápota';
        } else if (score > 1500) {
            return 'Šlapka';
        } else if (score > 500) {
            return 'Zajíc';
        }
        return 'Zajíček';
    }


    function redrawScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = 'Skore: ' + score;

        const rankElement = document.getElementById('rank');
        rankElement.innerHTML = 'Hodnost: ' + getRank();
    }

    function canPlayAudio() {
        if (audio !== null && !audio.paused) {
            return false;
        }
        return true;
    }

    function play(name) {
        if (!canPlayAudio()) {
            return;
        }
        audio = new Audio(`https://milujimandragoru.cz/sound/${name}`);
        audio.play();

        if (name === '39.mp3') {
            increaseScore(10);
        } else {
            increaseScore(5);
        }
        redrawScore();
    }
    redrawScore();
});

