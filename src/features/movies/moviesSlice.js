import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";
import axios from "axios";

const initialState = {
  loadingState: "idle",
  allmovies: [],
  error: "",
};

const moviesArrayFromRawData = (moviesRawData, genres, moviesArray) => {
  moviesRawData.forEach((movie) => {
    let movieGenres = [];
    movie.genre_ids.forEach((genre_id) => {
      const genre = genres.find(({ id }) => id === genre_id);
      if (genre) movieGenres.push(genre.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.title ? movie.title : movie.original_title,
        image: movie.backdrop_path,
        popularity: movie?.popularity,
        releaseDate: movie?.release_date,
        adultRate: movie?.adult,
        overview: movie?.overview.slice(0, 100),
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api_url, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api_url}${paging ? `&page=${i}` : ""}`);
    moviesArrayFromRawData(results, genres, moviesArray);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async ({ type }, thunkApi) => {
  try {
    const {
      genres: { genres },
    } = thunkApi.getState();
    const api_url = `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`;
    const movieArray = await getRawData(api_url, genres, true);
    return movieArray;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loadingState = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.allmovies = action.payload;
        state.loadingState = "idle";
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loadingState = "idle";
        state.error = action.payload;
      });
  },
});

export const selectAllMovies = (state) => state.movies.allmovies;

export default moviesSlice.reducer;
