import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomHeader from '../../components/CustomHeader';

describe('CustomHeader', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText } = render(<CustomHeader onSearch={() => {}} />);
        expect(getByPlaceholderText('Search by name or price')).toBeTruthy();
    });

    it('calls onSearch when search is performed', () => {
        const mockOnSearch = jest.fn();
        const { getByPlaceholderText } = render(<CustomHeader onSearch={mockOnSearch} />);
        const input = getByPlaceholderText('Search by name or price');
        fireEvent.changeText(input, 'test search');
        expect(mockOnSearch).toHaveBeenCalledWith('test search');
    });
});
