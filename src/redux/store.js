import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// Import your reducers
import { userReducer, postOfFollowingReducer, allUsersReducer, userProfileReducer, getPostByIdReducer} from './Reducers/User';
import { allPostsReducer, likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

// Redux-persist configuration
const persistConfig = {
    key: 'root',  // Root key for the persisted state in localStorage
    storage,      // Default storage is localStorage
};

// Combine all the reducers
const rootReducer = combineReducers({
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    userProfile: userProfileReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userPosts: userPostsReducer,
    allPosts: allPostsReducer,
    getPostById: getPostByIdReducer,
});

// Create a persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable checks (for redux-persist compatibility)
            immutableCheck: false,    // Disable immutable checks
        }),
});

// Create a persistor for the store
export const persistor = persistStore(store);
