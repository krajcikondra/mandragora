import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {fetchCount} from './counterAPI';
import {mandragoraStorage} from "../../app/model/mandragora-storage";
import {getRank} from "../../app/model/rank-by-score";
import {audioPlayer} from "../../app/model/audio-player";

export interface CounterState {
  score: number;
  rank: string;
  hero: string|null;
}

const initialState: CounterState = {
  score: mandragoraStorage.getScore(),
  rank: getRank(mandragoraStorage.getScore()),
  hero: mandragoraStorage.getHero(),
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
    setHero: (state, action: PayloadAction<string>) => {
        state.hero = action.payload;
        mandragoraStorage.setHero(action.payload);
    },
  },
});

export const { incrementByAmount, setHero} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectScore = (state: RootState) => state.counter.score;
export const selectRank = (state: RootState) => state.counter.rank;
export const selectHero = (state: RootState) => state.counter.hero;

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
