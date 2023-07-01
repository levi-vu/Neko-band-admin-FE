import updateProductReducer from './update-product-slice';
import { configureStore } from '@reduxjs/toolkit'
import managementPageReducer from './management-page-slice'
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';

export const store = configureStore({
  reducer: {
    updateProduct: updateProductReducer,
    ManagementPage: managementPageReducer
  },
  devTools: !isEqual(process.env.NODE_ENV, 'production')
})

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
