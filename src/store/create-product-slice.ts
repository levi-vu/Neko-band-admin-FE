import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateProductRequest, ProductInput, VariantInput } from "../models/interfaces/create-product.type";
import FormValue from "../models/interfaces/form-value.model";

const initialMainForm: ProductInput = {
    id: 0,
    productCode: '',
    name: '',
    price: 0,
    costPrice: 0,
    description: '',
    typeIds: [],
    types: [],
    sourceId: 0,
    source: null,
    listUrlImage: [],
};

const initValueVariantForm: VariantInput = {
    attributes: []
}

const initialState = { ...initialMainForm, ...initValueVariantForm } as CreateProductRequest;

export const CreateProductSlice = createSlice({
    name: 'CreateProduct',
    initialState,
    reducers: {
        clearForm: (state: CreateProductRequest, action: PayloadAction<'all' | 'product' | 'variant'>) => {
          switch(action.payload){
            case "product": return {...state, ...initialMainForm}
            case "variant": return {...state, ...initValueVariantForm}
            default: return initialState
           }
        },
        setImage: (state: CreateProductRequest, action: PayloadAction<string>) => {
            state.listUrlImage = [...state.listUrlImage, action.payload];
        },
        removeImage: (state: CreateProductRequest, action: PayloadAction<string>) => {
            state.listUrlImage = state.listUrlImage.filter(url => url !== action.payload);
        },
        setForm: (state: CreateProductRequest, action: PayloadAction<FormValue>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value,
            };
        },
        removeAttribute: (state: CreateProductRequest, action: PayloadAction<number>) => {
           state.attributes.splice(action.payload, 1);
        }
    }
})

export const { setForm, setImage, removeImage, clearForm, removeAttribute } = CreateProductSlice.actions
export default CreateProductSlice.reducer