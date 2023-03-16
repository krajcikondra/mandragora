import {Activity} from "../components/items";
import {audioPlayer} from "./audio-player";
import {mandragoraStorage} from "./mandragora-storage";

const increase = (points: number, increaseFc: any): void => {
    mandragoraStorage.increaseScore(points);
    increaseFc(points);
};

const play = (activity: Activity, increaseFc: any): void => {
    audioPlayer.play(activity.audioName).then(() => {
        increase(activity.points, increaseFc);
    });
};

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
