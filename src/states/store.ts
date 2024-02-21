import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import pageTypeReducer from "./pageTypeSlice";
import blogReducer from "./blogSlice";
import storage from "redux-persist/lib/storage";
import { blogApi } from "../apis/blogApi";
import { userApi } from "../apis/userApi";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

export type RootState = ReturnType<typeof rootReducer>;

type PersistConfig = {
  key: string;
  version: number;
  storage: any;
};

const rootReducer = combineReducers({
  auth: authReducer,
  pageType: pageTypeReducer,
  blog: blogReducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const authPersistConfig: PersistConfig  = {
    key: "auth",
    version: 1,
    storage,
};

const pageTypePersistConfig: PersistConfig  = {
    key: "pageType",
    version: 1,
    storage,
};

const blogPersistConfig: PersistConfig  = {
    key: "blog",
    version: 1,
    storage,
};

const createPersistedReducer = (persistConfig: PersistConfig , reducer: any) => {
    return persistReducer(persistConfig, reducer);
};

const store = configureStore({
    reducer: {
        auth: createPersistedReducer(authPersistConfig, authReducer),
        pageType: createPersistedReducer(pageTypePersistConfig, pageTypeReducer),
        blog: createPersistedReducer(blogPersistConfig, blogReducer),
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(blogApi.middleware)
            .concat(userApi.middleware),
});

const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch

export { store, persistor };
