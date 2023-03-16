import {levels} from "./levels";

export const getRank = (score: number): string => {
    if (score > levels.level6) {
        return 'Stará ojetá šlapka kterou nikdo nehce';
    } else if (score > levels.level5) {
        return 'Stará ojetá šlápota';
    } else if (score > levels.level4) {
        return 'Stará šlapka';
    } else if (score > levels.level3) {
        return 'Šlápota';
    } else if (score > levels.level2) {
        return 'Šlapka';
    } else if (score > levels.level1) {
        return 'Zajíc';
    }
    return 'Zajíček';
}
