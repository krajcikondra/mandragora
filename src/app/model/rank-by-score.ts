import {levels} from "./levels";

export const getRank = (score: number): string => {
    if (score >= levels.level9) {
        return 'Stará ojetá šlapka kterou nikdo nehce';
    } if (score >= levels.level8) {
        return 'Šlapka senior';
    } else if (score >= levels.level7) {
        return 'Stará ojetá šlápota';
    } else if (score >= levels.level6) {
        return 'Stará šlapka';
    } else if (score >= levels.level5) {
        return 'Zajetá šlápota';
    } else if (score >= levels.level4) {
        return 'Šlápota';
    } else if (score >= levels.level3) {
        return 'Zajetá šlapka';
    } else if (score >= levels.level2) {
        return 'Šlapka';
    } else if (score >= levels.level1) {
        return 'Zajíc';
    }
    return 'Zajíček';
}
