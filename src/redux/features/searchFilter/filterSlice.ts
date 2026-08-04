import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParams: '' 
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchParams: (state, action) => {     
      state.searchParams = action.payload; 
    },
    clearSearchParams: (state)=>{
      state.searchParams = ''; 
    }
  },
});

export const { addSearchParams, clearSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
