import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";
import { ManagementPage } from "../models/interfaces/management-page";
import { createCategory, createSource, createTag } from "../services/product-service";
import { OptionKey } from "../shared/constants/option-key";
import { Status } from "../shared/constants/status";

const initialOptions: ManagementPage = {
    SourceOptions: [],
    CategoryOptions: [],
    TagOptions: [],
    isOpen: false,
    productId: 0
}

const initialState = { ...initialOptions, status: "" };
export const ManagementPageSlice = createSlice({
    name: 'managementPage',
    initialState,
    reducers: {
        setOptions: (state, action: PayloadAction<{ key: string, value: DefaultOptionType[] }>) => {
            return {
                ...state,
                [action.payload.key]: [...action.payload.value]
            }
        },
        clearStatus: (state) => {
            state.status = Status.new;
        },
        openCreateProduct: (state, action: PayloadAction) => {
            state.isOpen = true;
            state.productId = 0;
        },
        openUpdateProduct: (state, action: PayloadAction<number>) => {
            state.isOpen = true;
            state.productId = action.payload;
        },
        closePopupProduct: (state, action: PayloadAction) => {
            state.isOpen = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(addOptions.pending, (state) => {
            state.status = Status.loading;
        }).addCase(addOptions.fulfilled, (state, { payload }) => {
            switch (payload.key) {
                case OptionKey.sourceKey:
                    state.SourceOptions.push(payload.value);
                    break;
                case OptionKey.categoryKey:
                    state.CategoryOptions.push(payload.value);
                    break;
                default: state.TagOptions.push(payload.value);
            }
            state.status = Status.success;
        }).addCase(addOptions.rejected, (state, action) => {
            state.status = Status.failed;
        });
    }
});

export const addOptions = createAsyncThunk('updateProduct/addOptions', async (action: { key: string, value: string }) => {
    let postFunction;
    switch (action.key) {
        case OptionKey.sourceKey:
            postFunction = createSource;
            break;
        case OptionKey.categoryKey:
            postFunction = createCategory;
            break;
        default: postFunction = createTag;
    }
    const response = await postFunction(action.value);
    return { key: action.key, value: { label: response.name, value: response.id } as DefaultOptionType };
});




export const { setOptions, clearStatus, openCreateProduct, openUpdateProduct, closePopupProduct } = ManagementPageSlice.actions;
export default ManagementPageSlice.reducer;