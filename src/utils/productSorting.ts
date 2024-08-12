import { Product } from '../types/';

type SortableProductField = keyof Pick<Product, 'name' | 'price' | 'brand' | 'sku' | 'url_key' | 'stock_status'>;

export const sortProducts = (
    productIds: number[],
    byId: { [key: number]: Product },
    searchTerm: string,
    fields: SortableProductField[] = ['name', 'price', 'brand', 'sku', 'url_key', 'stock_status']
): number[] => {
    const lowercasedTerm = searchTerm.toLowerCase();

    return productIds.sort((a, b) => {
        const productA = byId[a];
        const productB = byId[b];

        for (const field of fields) {
            const valueA = String(productA[field]).toLowerCase();
            const valueB = String(productB[field]).toLowerCase();

            if (valueA === lowercasedTerm) return -1;
            if (valueB === lowercasedTerm) return 1;
        }

        for (const field of fields) {
            const valueA = String(productA[field]).toLowerCase();
            const valueB = String(productB[field]).toLowerCase();

            const matchA = valueA.includes(lowercasedTerm);
            const matchB = valueB.includes(lowercasedTerm);

            if (matchA && !matchB) return -1;
            if (matchB && !matchA) return 1;
        }

        return 0;
    });
};
