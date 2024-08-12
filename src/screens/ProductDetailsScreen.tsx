import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../store/productSlice';
import { RootState, AppDispatch } from '../store';
import { RouteProp } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

type RootStackParamList = {
    ProductDetails: { productId: number };
};

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface ProductDetailsScreenProps {
    route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
    const { productId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { byId, status, error } = useSelector((state: RootState) => state.products);
    const product = byId[productId];

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductDetails(productId));
        }
    }, [dispatch, productId, product]);

    if (status === 'loading' || !product) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#ED1971" />
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error: {error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                <ProductCard product={product} isDetailView={true} />
                <View className="p-4">
                    <TouchableOpacity
                        className="mt-4 bg-mumz-pink rounded-full py-3 items-center"
                        disabled={product.stock_status !== 'IN_STOCK'}
                    >
                        <Text className="text-white font-bold text-lg">
                            {product.stock_status === 'IN_STOCK' ? 'Add to Cart' : 'Out of Stock'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetailsScreen;
