import updateProductReducer from './update-product-slice';
import { configureStore } from '@reduxjs/toolkit'
import managementPageReducer from './management-page-slice';
import userReducer from './user-slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    updateProduct: updateProductReducer,
    ManagementPage: managementPageReducer,
    User: userReducer
  },
  devTools: !import.meta.env.PROD
})

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
