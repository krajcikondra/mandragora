document.addEventListener("DOMContentLoaded", function(event) {
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
        return Math.floor(Math.random() * 44);
    }

    function getRank() {
        if (score > 10000) {
            return 'Stará ojetá šlapka kterou nikdo nehce';
        } else if (score > 2500) {
            return 'Stará ojetá šlápota';
        } else if (score > 2000) {
            return 'Stará šlapka';
        } else if (score > 1500) {
            return 'Šlápota';
        } else if (score > 1000) {
            return 'Šlapka';
        } else if (score > 500) {
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
        if (score <= 500) {
            lockPremiumItems(true);
        } else {
            lockPremiumItems(false);
        }

        if (score >= 1500) {
            const randomItem = document.getElementById('random-item');
            if (randomItem) {
                randomItem.removeAttribute('class');
            }
        }

        if (score >= 2000) {
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

