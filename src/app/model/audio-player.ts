import {itemsData} from "../components/items";

var audio: any|null = null;
export const level1 = 100;
export const level2 = 250;
export const level3 = 500;
export const level4 = 750;
export const level5 = 1000;
export const level6 = 1250;
const highestAudioNumber = itemsData.length;

function canPlayAudio() {
    if (audio !== null && !audio.paused) {
        return false;
    }
    return true;
}

const playCelebrate = () => {
    audio = new Audio('/sound/celebrate.wav');
    audio.play();
};

const playSniff = () => {
    audio = new Audio('/sound/sniff.wav');
    audio.play();
};

const play = async (name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (!canPlayAudio()) {
            reject();
            return false;
        }
        audio = new Audio(`/sound/${name}`);
        audio.play();
        const intervalId = setInterval(() => {
            if (canPlayAudio()) {
                clearInterval(intervalId);
                resolve(true);
            }
        }, 100);
    });
}

const generateRandom = (exclude?: number[]) => {
    if (!exclude)  {
        return Math.floor(Math.random() * highestAudioNumber) + 1;
    }
    while (true) {
        const random = Math.floor(Math.random() * highestAudioNumber) + 1;
        if (!exclude.includes(random)) {
            return random;
        }
    }
}

export const generateRandomInRange = (min: number, max: number): number => {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}


const playRandom = (): Promise<boolean> => {
    return play(`${generateRandom()}.mp3`);
};

const playStory = async (story: number[]): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (story.length === 0) {
            resolve(true);
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
    });
}

const generateStoryAndPlay = async () => {
    return new Promise(() => {
        if (!canPlayAudio()) {
            return;
        }
        const story: number[] = [];
        for (let i = 0; i < 4; i++) {
            story.push(generateRandom(story));
        }

        return playStory(story);
    });
}

export const audioPlayer = {
    play,
    generateStoryAndPlay,
    playRandom,
    playSniff,
    playCelebrate,
    generateRandomInRange,
};
