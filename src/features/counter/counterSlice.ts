import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {fetchCount} from './counterAPI';
import {mandragoraStorage} from "../../app/model/mandragora-storage";
import {getRank} from "../../app/model/rank-by-score";
import {audioPlayer} from "../../app/model/audio-player";

export interface CounterState {
  score: number;
  money: number;
  rank: string;
  hero: string|null;
  health: number;
  storeActive: boolean;
  addictionLevel: number;
  drugCounter: number;
}

const initialState: CounterState = {
  score: mandragoraStorage.getScore(),
  rank: getRank(mandragoraStorage.getScore()),
  hero: mandragoraStorage.getHero(),
  money: mandragoraStorage.getMoney(),
  health: mandragoraStorage.getHealth(),
  storeActive: false,
  addictionLevel: mandragoraStorage.getAddictionLevel(),
  drugCounter: mandragoraStorage.getDrugCounter(),
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
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
    openStore: (state, action: PayloadAction<boolean>) => {
        state.storeActive = action.payload;
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
        if (state.drugCounter > 50) {
            state.addictionLevel = 5;
        } else if (state.drugCounter > 35) {
            state.addictionLevel = 4;
        } else if (state.drugCounter > 20) {
            state.addictionLevel = 3;
        } else if (state.drugCounter > 15) {
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
    openStore,
    setAddictionLevel,
    setDrugCounter,
    increaseDrugCounter,
} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectScore = (state: RootState) => state.counter.score;
export const selectMoney = (state: RootState) => state.counter.money;
export const selectRank = (state: RootState) => state.counter.rank;
export const selectHero = (state: RootState) => state.counter.hero;
export const selectHealth = (state: RootState) => state.counter.health;
export const selectOpenStore = (state: RootState) => state.counter.storeActive;
export const selectAddictionLevel = (state: RootState) => state.counter.addictionLevel;
export const selectDrugCounter = (state: RootState) => state.counter.drugCounter;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectScore(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default counterSlice.reducer;
