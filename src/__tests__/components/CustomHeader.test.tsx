import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomHeader from '../../components/CustomHeader';

describe('CustomHeader', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<CustomHeader onSearch={() => {}} />);
        const searchIcon = getByTestId('search-icon');
        expect(searchIcon).toBeTruthy();
    });

    it('shows search input when search icon is pressed', () => {
        const { getByTestId, queryByTestId } = render(<CustomHeader onSearch={() => {}} />);
        const searchIcon = getByTestId('search-icon');
        fireEvent.press(searchIcon);
        expect(queryByTestId('search-input')).toBeTruthy();
    });

    it('calls onSearch when search text changes', () => {
        const mockOnSearch = jest.fn();
        const { getByTestId } = render(<CustomHeader onSearch={mockOnSearch} />);

        const searchIcon = getByTestId('search-icon');
        fireEvent.press(searchIcon);

        const searchInput = getByTestId('search-input');
        fireEvent.changeText(searchInput, 'test search');

        expect(mockOnSearch).toHaveBeenCalledWith('test search');
    });

    it('clears search when close button is pressed', () => {
        const mockOnSearch = jest.fn();
        const { getByTestId } = render(<CustomHeader onSearch={mockOnSearch} />);

        const searchIcon = getByTestId('search-icon');
        fireEvent.press(searchIcon);

        const searchInput = getByTestId('search-input');
        fireEvent.changeText(searchInput, 'test search');

        const closeButton = getByTestId('close-search');
        fireEvent.press(closeButton);

        expect(mockOnSearch).toHaveBeenCalledWith('');
    });
});
