import { createSlice } from "@reduxjs/toolkit";
export const genreAndCategory = createSlice({
  name: "genreAndCategory",
  initialState: {
    genreIdOrCategoryName:'',
    page:1,
    searchQuery: '',
  },
  reducers: {
    selectGenreAndCategory:(state,action)=>{
        console.log(action.payload)
       state.genreIdOrCategoryName = action.payload
       state.searchQuery= '';
    },
    searchMovie:(state,action)=>{
      state.searchQuery = action.payload
    }
  },
});

export const { selectGenreAndCategory, searchMovie } = genreAndCategory.actions;

export default genreAndCategory.reducer;
