import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

export type RootStackParamList = {
    ProductList: undefined;
    ProductDetails: { productId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ED1971',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="ProductList"
                    component={ProductListScreen}
                    options={{ title: 'Mumzworld Products' }}

                />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetailsScreen}
                    options={{ title: 'Product Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
