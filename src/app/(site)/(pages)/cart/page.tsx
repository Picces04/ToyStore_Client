import React from 'react';
import Cart from '@/components/Cart';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'ToyST - Giỏ hàng',
    description: 'This is Cart Page for NextCommerce Template',
    // other metadata
};

const CartPage = () => {
    return (
        <>
            <Cart />
        </>
    );
};

export default CartPage;
