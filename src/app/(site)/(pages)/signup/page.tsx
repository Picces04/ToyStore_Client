import Signup from '@/components/Auth/Signup';
import React from 'react';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'ToyST -  Đăng ký',
    description: 'This is Signup Page for NextCommerce Template',
    // other metadata
};

const SignupPage = () => {
    return (
        <main>
            <Signup />
        </main>
    );
};

export default SignupPage;
