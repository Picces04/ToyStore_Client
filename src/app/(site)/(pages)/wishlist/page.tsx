import React from 'react';
import { Wishlist } from '@/components/Wishlist';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ToyST - Yêu Thích',
    description: 'This is Wishlist Page for NextCommerce Template',
    // other metadata
};

const WishlistPage = () => {
    return (
        <main>
            <Wishlist />
        </main>
    );
};

export default WishlistPage;
