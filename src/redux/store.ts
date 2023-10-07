import { configureStore } from '@reduxjs/toolkit'
import zenodoSlice from './slices/zenodoSlice'
import chatSlice from './slices/chatSlice'
import projectsSlice from './slices/projectsSlice'
import recordSlice from './slices/recordSlice'
import repoSlice from './slices/repoSlice'

export const store = configureStore({
  reducer: {
    zenodoSlice,
    chatSlice,
    projectsSlice,
    recordSlice,
    repoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch