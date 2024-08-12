import React from 'react';
import { render } from '@testing-library/react-native';
import ProductCard from '../../components/ProductCard';

const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 9.99,
    image: 'https://example.com/image.jpg',
    brand: 'Test Brand',
    sku: 'TEST123',
    stock_status: 'IN_STOCK',
    url_key: 'classic-world-doggyasda'
};

describe('ProductCard', () => {
    it('renders product information correctly', () => {
        const { getByText } = render(<ProductCard product={mockProduct} />);
        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('$9.99')).toBeTruthy();
        expect(getByText('Test Brand')).toBeTruthy();
    });
});
