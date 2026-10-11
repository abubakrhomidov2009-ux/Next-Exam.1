import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './todoStore'

export const makeStore = () =>
  configureStore({
    reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
  })