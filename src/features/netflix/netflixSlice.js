import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";

export const getGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const { genres } = (await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)).data;
  return genres;
});

const initialState = {
  genres: [],
  genresLoaded: false,
  loadingStatus: "idle",
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGenres.pending, (state) => {
      state.loadingStatus = "pending";
    });
  },
});

export const selectAllGenres = (state) => state.genres;

export default genresSlice.reducer;
