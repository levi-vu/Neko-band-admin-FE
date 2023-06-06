import { configureStore } from '@reduxjs/toolkit'
import CreateProductReducer from './create-product-slice'

export const store = configureStore({
  reducer: {
    createProduct: CreateProductReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
