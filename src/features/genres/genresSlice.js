import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";

export const getGenres = createAsyncThunk("netflix/getGenres", async (_, { rejectWithValue }) => {
  try {
    const {
      data: { genres },
    } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
  genres: [],
  genresLoaded: false,
  loadingState: "idle",
  error: "",
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGenres.pending, (state) => {
        state.loadingState = "loading";
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
        state.loadingState = "idle";
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingState = "idle";
      });
  },
});

export const selectAllGenres = (state) => state.genres;

export default genresSlice.reducer;
