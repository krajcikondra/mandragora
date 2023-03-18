var CryptoJS = require("crypto-js");

const verifyScoreSecret = 'dfsafosa7s8dfasvadssa';

const setSecret = (value: number): void => {
    const cipher = CryptoJS.AES.encrypt(String(value), 'mandragoraKey').toString();
    localStorage.setItem(verifyScoreSecret, cipher);
};

const getSecret = (): number|null => {
    const value = localStorage.getItem(verifyScoreSecret);
    if (!value) {
        return null;
    }

    const bytes  = CryptoJS.AES.decrypt(value, 'mandragoraKey');
    return Number(bytes.toString(CryptoJS.enc.Utf8));
};

const setScore = (score: number): void => {
    localStorage.setItem('score', String(score));
    setSecret(score);
};

const setMoney = (money: number): void => {
    localStorage.setItem('money', String(money));
};

const verifyScore = (): boolean => {
    const secretScore = getSecret();
    if (!secretScore) {
        return true;
    }
    return secretScore === getScore();
};

const increaseScore = (increase: number): void => {
    if (!verifyScore()) {
        localStorage.removeItem('score');
        localStorage.removeItem(verifyScoreSecret);
        window.location.reload();
        return;
    }
    setScore(getScore() + increase);
};

const increaseMoney = (increase: number): void => {
    setMoney(getMoney() + increase);
};

const getScore = (): number => {
    return Number(localStorage.getItem('score'));
};

const getMoney = (): number => {
    return Number(localStorage.getItem('money'));
};

const getHero = (): string|null => {
    return localStorage.getItem('hero');
};

const setHero = (hero: string|null): void => {
    if (hero) {
        localStorage.setItem('hero', hero);
    } else {
        localStorage.removeItem('hero');
    }
};

export const mandragoraStorage = {
    setScore,
    increaseScore,
    getScore,
    increaseMoney,
    getHero,
    setHero,
    getMoney,
};
