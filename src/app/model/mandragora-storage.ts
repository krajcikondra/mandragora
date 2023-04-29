var CryptoJS = require("crypto-js");

const verifyScoreSecret = 'dfsafosa7s8dfasvadssa';
const cryptoKey = 'mandragoraKey';
const moneyKey = 'dfsaf89sd89fhsafd89';
const scoreKey = 'd8fjdf888d888ffdsa';
const healthKey = '8fhfhsd988f88';
const addictionLevelKey = '8f4fhfhsd988f88xxff';
const drugCounterKey = '3f4fhfhd988f88uf';

const setValueEncrypted = (name: string, value: number): void => {
    const cipher = CryptoJS.AES.encrypt(String(value), cryptoKey).toString();
    localStorage.setItem(name, cipher);
}

const getValueEncrypted = (name: string): number|null => {
    const value = localStorage.getItem(name);
    if (!value) {
        return null;
    }

    const bytes  = CryptoJS.AES.decrypt(value, cryptoKey);
    return Number(bytes.toString(CryptoJS.enc.Utf8));
}

const setSecret = (value: number): void => {
    const cipher = CryptoJS.AES.encrypt(String(value), cryptoKey).toString();
    localStorage.setItem(verifyScoreSecret, cipher);
};

const getSecret = (): number|null => {
    const value = localStorage.getItem(verifyScoreSecret);
    if (!value) {
        return null;
    }

    const bytes  = CryptoJS.AES.decrypt(value, cryptoKey);
    return Number(bytes.toString(CryptoJS.enc.Utf8));
};

const setScore = (score: number): void => {
    setValueEncrypted(scoreKey, score);
    setSecret(score);
};

const setMoney = (money: number): void => {
    setValueEncrypted(moneyKey, money);
};

const setHealth = (health: number): void => {
    setValueEncrypted(healthKey, health);
};

const setAddictionLevel = (addictionLevel: number): void => {
    setValueEncrypted(addictionLevelKey, addictionLevel);
};

const setDrugCounter = (addictionLevel: number): void => {
    setValueEncrypted(drugCounterKey, addictionLevel);
};

const increaseHealth = (amount: number): void => {
    setHealth(getHealth() + amount);
};

const decreaseHealth = (amount: number): void => {
    setHealth(getHealth() - amount);
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
        localStorage.removeItem(scoreKey);
        localStorage.removeItem(verifyScoreSecret);
        window.location.reload();
        return;
    }
    setScore(getScore() + increase);
};

const increaseMoney = (increase: number): void => {
    setMoney(getMoney() + increase);
};

const decreaseMoney = (increase: number): void => {
    setMoney(getMoney() - increase);
};

const getScore = (): number => {
    return Number(getValueEncrypted(scoreKey));
};

const getAddictionLevel = (): number => {
    return Number(getValueEncrypted(addictionLevelKey));
};

const getDrugCounter = (): number => {
    return Number(getValueEncrypted(drugCounterKey));
};

const getMoney = (): number => {
    return Number(getValueEncrypted(moneyKey));
};

const getHealth = (): number => {
    const value = getValueEncrypted(healthKey);
    if (value === null) {
        return 100;
    }
    return Number(value);
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

const reset = () => {
    localStorage.removeItem('hero');
    localStorage.removeItem(scoreKey);
    localStorage.removeItem(moneyKey);
    localStorage.removeItem(healthKey);
    localStorage.removeItem(verifyScoreSecret);
    localStorage.removeItem(addictionLevelKey);
    localStorage.removeItem(drugCounterKey);
};

export const mandragoraStorage = {
    setScore,
    increaseScore,
    getScore,
    increaseMoney,
    decreaseMoney,
    getHero,
    setHero,
    getMoney,
    getHealth,
    increaseHealth,
    decreaseHealth,
    reset,
    setHealth,
    setAddictionLevel,
    getAddictionLevel,
    setDrugCounter,
    getDrugCounter,
};
