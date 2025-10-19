export interface Product {
    id: string;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    supplier: {
        id: string;
        name: string | null;
    };
    category: {
        id: string;
        categoryName: string;
        parentId: string | null;
        parentName: string | null;
    };
    promotion: any | null;
    image: string[];
    productStatus: number;
    slug: string;
    isDeleted: boolean;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}
