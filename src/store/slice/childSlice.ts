import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Child {
  id: number;
  name: string;
}

interface ChildState {
  selectedChild: Child | null;
}

const initialState: ChildState = {
  selectedChild: null,
};

const childSlice = createSlice({
  name: 'child',
  initialState,
  reducers: {
    setSelectedChild: (state, action: PayloadAction<Child>) => {
      state.selectedChild = action.payload;
    },
    clearSelectedChild: (state) => {
      state.selectedChild = null;
    },
  },
});

export const { setSelectedChild, clearSelectedChild } = childSlice.actions;
export default childSlice.reducer;
