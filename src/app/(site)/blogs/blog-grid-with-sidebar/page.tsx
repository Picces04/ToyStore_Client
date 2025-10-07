import React from 'react';
import BlogGridWithSidebar from '@/components/BlogGridWithSidebar';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'ToyST - Cẩm nang',
    description: 'This is Blog Grid Page for NextCommerce Template',
    // other metadata
};

const BlogGridWithSidebarPage = () => {
    return (
        <>
            <BlogGridWithSidebar />
        </>
    );
};

export default BlogGridWithSidebarPage;
