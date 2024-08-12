// screens/ProductListScreen.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { RootState, AppDispatch } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '../types';
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
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = allIds.filter(id => {
            const product = byId[id];
            return (
                product.name.toLowerCase().includes(lowercasedTerm) ||
                product.price.toString().includes(lowercasedTerm)
            );
        });

        // Sort the filtered results
        const sorted = filtered.sort((a, b) => {
            const productA = byId[a];
            const productB = byId[b];
            const nameA = productA.name.toLowerCase();
            const nameB = productB.name.toLowerCase();
            const priceA = productA.price.toString();
            const priceB = productB.price.toString();

            // Check for exact matches first
            if (nameA === lowercasedTerm || priceA === lowercasedTerm) return -1;
            if (nameB === lowercasedTerm || priceB === lowercasedTerm) return 1;

            // Then check for partial matches
            const nameMatchA = nameA.includes(lowercasedTerm);
            const nameMatchB = nameB.includes(lowercasedTerm);
            const priceMatchA = priceA.includes(lowercasedTerm);
            const priceMatchB = priceB.includes(lowercasedTerm);

            if (nameMatchA && !nameMatchB) return -1;
            if (nameMatchB && !nameMatchA) return 1;
            if (priceMatchA && !priceMatchB) return -1;
            if (priceMatchB && !priceMatchA) return 1;

            // If no difference in matching, maintain original order
            return 0;
        });

        setFilteredAndSortedIds(sorted);
    }, [searchTerm, allIds, byId]);

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
