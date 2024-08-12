import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductState } from '../types';
import { EXPO_API_URL } from '@env';


const initialState: ProductState = {
    byId: {},
    allIds: [],
    status: 'idle',
    error: null,
};

const extractProductData = (item: any): Product => ({
    id: item?.id,
    name: item?.name || 'Unknown Product',
    sku: item?.sku || '',
    price: item.price_range?.minimum_price?.final_price?.value || 0,
    image: item.small_image?.url || '',
    brand: item.brand_info?.title || 'Unknown Brand',
    stock_status: item.stock_status || 'OUT_OF_STOCK',
    url_key: item?.url_key || '',
    description: item.description?.html || '',
    categories: item.categories?.map((cat: any) => cat.name) || [],
});

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(`${EXPO_API_URL}/product-list-large`);
        const productItems = response.data.data.products.items;


        return productItems.map(extractProductData);
    }
);

export const fetchProductDetails = createAsyncThunk<Product, number>(
    `products/fetchProductDetails`,
    async (productId) => {
        const response = await axios.get(`${EXPO_API_URL}/product`);
        const item = response.data.data.products.items[0]; // Assuming the API returns an array with a single item
        return extractProductData(item);
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.byId = {};
                state.allIds = [];
                action.payload.forEach(product => {
                    state.byId[product.id] = product;
                    state.allIds.push(product.id);
                });
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'succeeded';
                state.byId[action.payload.id] = action.payload;
                if (!state.allIds.includes(action.payload.id)) {
                    state.allIds.push(action.payload.id);
                }
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export default productSlice.reducer;
