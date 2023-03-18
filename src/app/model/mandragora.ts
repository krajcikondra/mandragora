import {Activity} from "../components/items";
import {audioPlayer} from "./audio-player";
import {mandragoraStorage} from "./mandragora-storage";

const increase = (points: number, increaseFc: any, earning?: number, increaseMoneyFc?: any): void => {
    mandragoraStorage.increaseScore(points);
    increaseFc(points);
    if (earning && increaseMoneyFc) {
        mandragoraStorage.increaseMoney(earning);
        increaseMoneyFc(earning);
    }
};

const play = (
    activity: Activity,
    increaseFc: any,
    increaseMoneyFc: any,
    decreaseHealth: any
): void => {
    audioPlayer.play(activity.audioName).then(() => {
        increase(activity.points, increaseFc, activity.earning, increaseMoneyFc);
        if (activity.healthRisk && amIInfected()) {
            mandragoraStorage.decreaseHealth(3);
            decreaseHealth(3);
        }
    });
};

const generateRandom = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
const amIInfected = (): boolean => generateRandom(1, 5) === 5;

const playStory = (points: number, increaseFc: any) => {
    audioPlayer.generateStoryAndPlay().then(() => {
        increase(points, increaseFc);
    });
};

const playRandom = (points: number, increaseFc: any) => {
    audioPlayer.playRandom().then(() => {
        increase(points, increaseFc);
    });
};

export const mandragora = {
    play,
    playStory,
    playRandom,
};
