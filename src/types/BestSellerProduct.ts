export type BestSellerProduct = {
    id: string;
    productName: string;
    description: string | null;
    price: number;
    quantity: number;
    supplier?: {
        name: string | null;
    } | null;
    category?: {
        parentName: string | null;
        childName: string | null;
    } | null;
    promotion?: {
        name: string | null;
    } | null;
    image?: string[] | string | null;
    productStatus?: number;
    slug: string;
    isDeleted?: boolean;
    createdBy?: string | null;
    createdOn?: string | null;
    updatedBy?: string | null;
    updatedOn?: string | null;
};
