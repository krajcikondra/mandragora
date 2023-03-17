const level1 = 50;
const level2 = 100;
const level3 = 200;
const level4 = 500;
const level5 = 800;
const level6 = 1250;
const level7 = 1750;
const level8 = 2000;
const level9 = 2500;

const allLevels = [
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
];

const getPrevLevelScore = (score: number): number => {
    const smallerLevels = allLevels.filter(l => l <= score);
    if (smallerLevels.length === 0) {
        return  0;
    }
    return smallerLevels[smallerLevels.length - 1];
};

const getNextScore = (score: number): number|null => {
    const higherLevels = allLevels.filter(l => l > score);
    if (higherLevels.length === 0) {
        return  null;
    }
    return higherLevels[0];
};

const getPercentOfNextLevel = (score: number): number => {
    const nextScore = getNextScore(score);
    if (nextScore === null) {
        return 100;
    }
    const prevScore = getPrevLevelScore(score);
    const diff = nextScore - prevScore;
    const amount = score - prevScore;
    return amount * 100 / diff;
};

export const levels = {
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    getPercentOfNextLevel,
};
