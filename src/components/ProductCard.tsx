import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onPress?: () => void;
    isDetailView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, isDetailView = false }) => {
    const CardContainer = isDetailView ? View : TouchableOpacity;
    const screenWidth = Dimensions.get('window').width;

    return (
        <CardContainer
            className={`bg-gray-100 rounded-lg shadow-md overflow-hidden ${
                isDetailView ? 'w-full' : 'w-[47%] m-2'
            }`}
            onPress={onPress}
        >
            <View className="relative">
                {product.image ? (
                    <Image
                        source={{ uri: product.image }}
                        style={{
                            width: isDetailView ? screenWidth : '100%',
                            height: isDetailView ? screenWidth : 150, // Adjust this value as needed for list view
                            resizeMode: isDetailView ? 'contain' : 'cover',
                        }}
                    />
                ) : (
                    <View style={{
                        width: isDetailView ? screenWidth : '100%',
                        height: isDetailView ? screenWidth : 150,
                        backgroundColor: '#e0e0e0',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size="large" color="#ED1971" />
                    </View>
                )}
            </View>
            <View className="p-4">
                <Text className={`font-bold ${isDetailView ? 'text-xl' : 'text-base'} text-mumz-dark-gray`} numberOfLines={isDetailView ? 0 : 2}>
                    {product.name}
                </Text>
                <Text className="text-mumz-pink font-semibold mt-2 text-lg">
                    ${product.price.toFixed(2)}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">{product.brand}</Text>
                {isDetailView && (
                    <>
                        <Text className="text-gray-700 mt-4">{product.description}</Text>
                        <Text className="text-gray-600 mt-2">SKU: {product.sku}</Text>
                        <Text className="text-gray-600 mt-1">
                            Status: {product.stock_status === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                        </Text>
                    </>
                )}
            </View>
        </CardContainer>
    );
};

export default ProductCard;
