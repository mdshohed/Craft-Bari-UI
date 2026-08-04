
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { persistReducer,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' 
import cartReducer from "./features/card/cardSlice";

const persistCardConfig = {
  key: "card",
  storage,
};

const persistFilterConfig = {
  key: "search",
  storage,
};

const persistedCardReducer = persistReducer(persistCardConfig, cartReducer);
const persistedFilterReducer = persistReducer(persistFilterConfig, cartReducer);



export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCardReducer,
    filter: persistedFilterReducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const persistor = persistStore(store);