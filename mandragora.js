document.addEventListener("DOMContentLoaded", function(event) {
    const level1 = 100;
    const level2 = 250;
    const level3 = 500;
    const level4 = 750;
    const level5 = 1000;
    const level6 = 1250;

    var items = document.getElementsByClassName('item');
    for(var i = 0; i < items.length; i++) {
        var anchor = items[i];
        anchor.onclick = function() {
            const isDisabled = Boolean(this.getAttribute('disabled'));
            if (!isDisabled) {
                play(this.dataset.name);
            }
        }
    }

    const randomItem = document.getElementById('random-item');
    if (randomItem) {
        randomItem.onclick = function() {
            play(`${generateRandom()}.mp3`);
        };
    }

    const storyItem = document.getElementById('story-item');
    if (storyItem) {
        storyItem.onclick = function() {
            generateStoryAndPlay();
        };
    }

    var audio = null;
    let score = Number(localStorage.getItem('score'));
    function increaseScore(scorePoints) {
        score += scorePoints;
        localStorage.setItem('score', score);
    }

    function generateRandom() {
        return Math.floor(Math.random() * 45) + 1;
    }

    function getRank() {
        if (score > level6) {
            return 'Stará ojetá šlapka kterou nikdo nehce';
        } else if (score > level5) {
            return 'Stará ojetá šlápota';
        } else if (score > level4) {
            return 'Stará šlapka';
        } else if (score > level3) {
            return 'Šlápota';
        } else if (score > level2) {
            return 'Šlapka';
        } else if (score > level1) {
            return 'Zajíc';
        }
        return 'Zajíček';
    }

    function lockPremiumItems(lock) {
        const premiumLength = 5;
        var items = document.getElementsByClassName('item');
        for (var i = items.length - premiumLength; i < items.length; i++) {
            if (lock) {
                items[i].setAttribute('disabled', true);
            } else {
                items[i].removeAttribute('disabled');
            }
        }
    }


    function redrawScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = 'Skore: ' + score;

        const rankElement = document.getElementById('rank');
        rankElement.innerHTML = 'Hodnost: ' + getRank();
        if (score <= level1) {
            lockPremiumItems(true);
        } else {
            lockPremiumItems(false);
        }

        if (score >= level3) {
            const randomItem = document.getElementById('random-item');
            if (randomItem) {
                randomItem.removeAttribute('class');
            }
        }

        if (score >= level4) {
            const randomItem = document.getElementById('story-item');
            if (randomItem) {
                randomItem.removeAttribute('class');
            }
        }

        if (score > 500000) {
            localStorage.removeItem('score');
            alert('ty kurvo. K tomu jsi nemohl přijít poctivě.');
        }

    }

    function generateStoryAndPlay() {
        if (!canPlayAudio()) {
            return;
        }
        const story = [];
        for (let i = 0; i < 4; i++) {
            story.push(generateRandom());
        }

        playStory(story);
   }

   function playStory(story) {
       if (story.length === 0) {
           increaseScore(15);
           redrawScore();
           return;
       }

       if (!canPlayAudio()) {
           setTimeout(() => {
               playStory(story);
           }, 300);
           return;
       }

       audio = new Audio(`https://milujimandragoru.cz/sound/${story.pop()}.mp3`);
       audio.play();
       setTimeout(() => {
           playStory(story);
       }, 300);
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

