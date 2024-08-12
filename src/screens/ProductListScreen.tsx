import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { RootState, AppDispatch } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { sortProducts } from '../utils/productSorting';
import CustomHeader from '../components/CustomHeader';
import ProductCard from '../components/ProductCard';

type RootStackParamList = {
    ProductList: undefined;
    ProductDetails: { productId: number };
};

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface ProductListScreenProps {
    navigation: ProductListNavigationProp;
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { byId, allIds, status, error } = useSelector((state: RootState) => state.products);
    const [filteredAndSortedIds, setFilteredAndSortedIds] = useState<number[]>([]);
    const [searchProduct, setSearchProduct] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts() as any);
        }
    }, [status, dispatch]);

    const handleSearch = useCallback((term: string) => {
        setSearchProduct(term);
    }, []);


    useEffect(() => {
        const lowercasedTerm = searchProduct.toLowerCase();
        const filtered = allIds.filter(id => {
            const product = byId[id];
            return (
                product.name.toLowerCase().includes(lowercasedTerm) ||
                product.price.toString().includes(lowercasedTerm) ||
                product.brand.toLowerCase().includes(lowercasedTerm) ||
                product.sku.toLowerCase().includes(lowercasedTerm) ||
                product.url_key.toLowerCase().includes(lowercasedTerm) ||
                product.stock_status.toLowerCase().includes(lowercasedTerm)
            );
        });

        const sorted = sortProducts(filtered, byId, searchProduct);
        setFilteredAndSortedIds(sorted);
    }, [searchProduct, allIds, byId]);

    const renderItem = ({ item: productId }: { item: number }) => {
        const product = byId[productId];
        return (
            <ProductCard
                product={product}
                onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
            />
        );
    };


    if (status === 'loading') {
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
        <SafeAreaView className="flex-1 bg-mumz-light-gray">
            <CustomHeader onSearch={handleSearch} />
            <FlatList
                data={filteredAndSortedIds}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 8 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        </SafeAreaView>
    );
};

export default ProductListScreen;
