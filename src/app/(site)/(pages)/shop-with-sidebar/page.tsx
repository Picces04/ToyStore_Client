import React from 'react';
import ShopWithSidebar from '@/components/ShopWithSidebar';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'ToyST - Sản phẩm',
    description: 'This is Shop Page for NextCommerce Template',
    // other metadata
};

const ShopWithSidebarPage = () => {
    return (
        <main>
            <ShopWithSidebar />
        </main>
    );
};

export default ShopWithSidebarPage;
