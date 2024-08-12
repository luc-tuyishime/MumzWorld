export interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    image: string;
    brand: string;
    stock_status: string;
    url_key: string;
    description?: string;
    categories?: string[];
}

export interface ProductState {
    byId: { [id: number]: Product };
    allIds: number[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
