import { Dispatch, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import generateCombinations from "../shared/functions/generate-combination";
import { RootState } from "./store";
import { ProductColor, ProductInput, ProductRequest, ProductState, ProductVariant, Variant } from "../models/interfaces/product/product";
import { createProduct, getProduct } from "../services/product-service";
import { FormInstance } from "antd";

const initialMainForm: ProductInput = {
    productId: 0,
    productCode: '',
    name: '',
    price: '0',
    costPrice: '0',
    description: '',
    categoryId: undefined,
    sourceId: undefined,
    tags: [],
};

const initialVariants: ProductVariant = {
    colors: [],
    variants: [],
    size: []
}

const initialState = { ...initialMainForm, ...initialVariants, isError: false, isLoading: false, isSuccess: false } as ProductState;

export function generateVariant(size: string[], colors: ProductColor[], newestSize = false) {
    return (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(newestSize ? setInfoForm({ key: 'size', value: size }) : setInfoForm({ key: 'colors', value: colors }))
        const state = getState().updateProduct;
        const colorAndSize = [state.colors.map(c => c.colorName), state.size]
        const variants = generateCombinations(colorAndSize).map(variant => {
            return {
                variantId: 0,
                variantCode: '',
                featureImage: '',
                variantName: variant.filter(v => v).map(v => v.toLocaleUpperCase()).join('-'),
                productName: state.name,
                quantity: 0,
                color: colorAndSize[0].length > 0 ? variant[0] : '',
                size: colorAndSize[1].length > 0 ? variant[1] ?? variant[0] : '',
            } as Variant
        });
        dispatch(setInfoForm({ key: 'variants', value: variants }))
    }
}

export const fetchProductById = createAsyncThunk<ProductRequest, { productId: number, productForm: FormInstance<ProductInput> }>(
    'updateProduct/fetchById',
    async ({ productId, productForm }: { productId: number, productForm: FormInstance<ProductInput> }) => {
        const response = await getProduct(productId);
        if (response.isSuccess) {
            productForm.setFieldsValue({ ...response.result });
        }
        return response.result;
    }
)

export const updateProduct = createAsyncThunk<number, FormInstance<ProductVariant>, { state: RootState }>("createProduct/updateProduct", async (variantForm: FormInstance<ProductVariant>, { getState, dispatch }) => {
    dispatch(setVariantForm(variantForm.getFieldsValue()));
    const request = { ...getState().updateProduct as ProductRequest };
    const response = await createProduct(request);
    return response.result;
});

export const UpdateProductSlice = createSlice({
    name: 'updateProduct',
    initialState,
    reducers: {
        clearForm: (state: ProductState, action: PayloadAction<'all' | 'product' | 'variant'>) => {
            switch (action.payload) {
                case "product": return { ...state, ...initialMainForm }
                case "variant": return { ...state, ...initialVariants }
                default: return initialState
            }
        },
        setProductInputForm: (state: ProductState, action: PayloadAction<ProductInput>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setVariantForm: (state: ProductState, action: PayloadAction<ProductVariant>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setInfoForm: (state: ProductState, action: PayloadAction<{ value: ProductColor[] | Variant[] | string[] | string, key: string }>) => {
            return {
                ...state,
                [action.payload.key]: [...action.payload.value]
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            return { ...action.payload, isLoading: false, isError: false, isSuccess: false }
        }).addCase(fetchProductById.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProductById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            return { ...state, isSuccess: true }
        }).addCase(updateProduct.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const { setProductInputForm, clearForm, setVariantForm, setInfoForm } = UpdateProductSlice.actions;
export default UpdateProductSlice.reducer;