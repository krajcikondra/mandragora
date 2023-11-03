import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface StoreState {
    storeActive: boolean;
}

const initialState: StoreState = {
    storeActive: false,
};

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        openStore: (state, action: PayloadAction<boolean>) => {
            state.storeActive = action.payload;
        },
    },
});

export const {
    openStore,
} = storeSlice.actions;

export const selectOpenStore = (state: RootState) => state.store.storeActive
export default storeSlice.reducer;