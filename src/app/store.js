import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../features/genres/genresSlice";
import moviesReducer from "../features/movies/moviesSlice";

const store = configureStore({
  reducer: {
    genres: genresReducer,
    movies: moviesReducer,
  },
});

export default store;
