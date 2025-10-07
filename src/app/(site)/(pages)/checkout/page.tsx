import React from 'react';
import Checkout from '@/components/Checkout';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'ToyST - Thanh Toán',
    description: 'This is Checkout Page for NextCommerce Template',
    // other metadata
};

const CheckoutPage = () => {
    return (
        <main>
            <Checkout />
        </main>
    );
};

export default CheckoutPage;
