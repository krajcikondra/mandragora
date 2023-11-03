import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import {mandragoraStorage} from "../model/mandragora-storage";
import {getRank} from "../model/rank-by-score";
import {audioPlayer} from "../model/audio-player";

export interface PlayerState {
  score: number;
  money: number;
  rank: string;
  hero: string|null;
  health: number;
  addictionLevel: number;
  drugCounter: number;
}

const initialState: PlayerState = {
  score: mandragoraStorage.getScore(),
  rank: getRank(mandragoraStorage.getScore()),
  hero: mandragoraStorage.getHero(),
  money: mandragoraStorage.getMoney(),
  health: mandragoraStorage.getHealth(),
  addictionLevel: mandragoraStorage.getAddictionLevel(),
  drugCounter: mandragoraStorage.getDrugCounter(),
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
        state.score += action.payload;
        const newRank = getRank(state.score);
        if (newRank != state.rank) {
            audioPlayer.playCelebrate();
        }
        state.rank = newRank;
    },
    incrementMoneyByAmount: (state, action: PayloadAction<number>) => {
        state.money += action.payload;
    },
    decreaseMoneyByAmount: (state, action: PayloadAction<number>) => {
        state.money -= action.payload;
    },
    decreaseHealth: (state, action: PayloadAction<number>) => {
        state.health -= action.payload;
        mandragoraStorage.setHealth(state.health);
        if (state.health <= 0) {
            alert('Nechal ses prcat, až jsi z toho chcípl. Zkus to znovu.');
            mandragoraStorage.reset();
            window.location.reload();
        }
    },
    increaseHealth: (state, action: PayloadAction<number>) => {
        state.health = Math.min(state.health + action.payload, 100);
        mandragoraStorage.setHealth(state.health);
    },
    setAddictionLevel: (state, action: PayloadAction<number>) => {
        state.addictionLevel = action.payload;
        mandragoraStorage.setAddictionLevel(state.health);
    },
    setDrugCounter: (state, action: PayloadAction<number>) => {
        state.drugCounter = action.payload;
        mandragoraStorage.setDrugCounter(state.drugCounter);
    },
    increaseDrugCounter: (state, action: PayloadAction<number>) => {
        state.drugCounter += action.payload;
        state.addictionLevel = 0;
        if (state.drugCounter > 25) {
            state.addictionLevel = 5;
        } else if (state.drugCounter > 20) {
            state.addictionLevel = 4;
        } else if (state.drugCounter > 15) {
            state.addictionLevel = 3;
        } else if (state.drugCounter > 10) {
            state.addictionLevel = 2;
        } else if (state.drugCounter > 5) {
            state.addictionLevel = 1;
        }
        mandragoraStorage.setDrugCounter(state.drugCounter);
        mandragoraStorage.setAddictionLevel(state.addictionLevel);
    },
    setHero: (state, action: PayloadAction<string|null>) => {
        state.hero = action.payload;
        mandragoraStorage.setHero(action.payload);
    },
  },
});

export const {
    incrementByAmount,
    incrementMoneyByAmount,
    decreaseMoneyByAmount,
    setHero,
    decreaseHealth,
    increaseHealth,
    setAddictionLevel,
    setDrugCounter,
    increaseDrugCounter,
} = playerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectScore = (state: RootState) => state.player.score;
export const selectMoney = (state: RootState) => state.player.money;
export const selectRank = (state: RootState) => state.player.rank;
export const selectHero = (state: RootState) => state.player.hero;
export const selectHealth = (state: RootState) => state.player.health;
export const selectAddictionLevel = (state: RootState) => state.player.addictionLevel;
export const selectDrugCounter = (state: RootState) => state.player.drugCounter;

export default playerSlice.reducer;
