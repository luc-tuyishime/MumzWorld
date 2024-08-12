// components/CustomHeader.tsx

import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomHeaderProps {
    onSearch: (searchTerm: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onSearch }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = useCallback((text: string) => {
        setSearchTerm(text);
        onSearch(text);
    }, [onSearch]);

    return (
        <View className="flex-row items-center px-4 h-14 bg-white border-b border-gray-200">
            {isSearchVisible ? (
                <View className="flex-1 flex-row items-center">
                    <TextInput
                        className="flex-1 h-10 px-4 mr-2 border border-mumz-pink rounded-full"
                        placeholder="Search by name or price"
                        value={searchTerm}
                        onChangeText={handleSearchChange}
                    />
                    <TouchableOpacity onPress={() => {
                        setIsSearchVisible(false);
                        setSearchTerm('');
                        onSearch('');
                    }}>
                        <Ionicons name="close" size={24} color="#ED1971" />
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-1 flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => setIsSearchVisible(true)}>
                        <Ionicons name="search" size={24} color="#ED1971" />
                    </TouchableOpacity>
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="heart-outline" size={24} color="#ED1971" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="cart-outline" size={24} color="#ED1971" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default CustomHeader;
