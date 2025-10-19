'use client';

import React, { useEffect, useMemo, useState } from 'react';
import SingleItem from './SingleItem';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/axios/api';
import { BestSellerProduct } from '@/types/BestSellerProduct';

const PRODUCTS_LIMIT = 10;

const BestSeller: React.FC = () => {
    const { year, month } = useMemo(() => {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() + 1 };
    }, []);

    const [products, setProducts] = useState<BestSellerProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiPath = useMemo(
        () => `/api/Statistic/product/${year}/${month}?topN=${PRODUCTS_LIMIT}`,
        [month, year]
    );

    useEffect(() => {
        const controller = new AbortController();

        const fetchBestSellerProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get<BestSellerProduct[]>(apiPath, {
                    signal: controller.signal,
                });

                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    throw new Error('Dữ liệu trả về không hợp lệ');
                }
            } catch (fetchError) {
                if (controller.signal.aborted) return;

                const message =
                    fetchError instanceof Error
                        ? fetchError.message
                        : 'Không thể tải danh sách sản phẩm';
                setError(message);
                setProducts([]);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchBestSellerProducts();

        return () => {
            controller.abort();
        };
    }, [apiPath]);

    return (
        <section className="overflow-hidden">
            <div className="max-w-[1170px] w-full mx-auto mt-15 px-4 sm:px-8 xl:px-0">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                            <Image
                                src="/images/icons/icon-07.svg"
                                alt="icon"
                                width={17}
                                height={17}
                            />
                            Trong tháng
                        </span>
                        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                            Bán Chạy Nhất
                        </h2>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="h-[403px] rounded-lg bg-[#F6F7FB] animate-pulse"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-6 py-5 text-red-600">
                        {error}
                    </div>
                ) : products.length === 0 ? (
                    <div className="rounded-lg bg-white border border-gray-200 px-6 py-5 text-gray-600">
                        Chưa có dữ liệu sản phẩm bán chạy trong tháng này.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
                        {products.slice(0, 6).map(product => (
                            <SingleItem item={product} key={product.id} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12.5">
                    <Link
                        href="/shop-without-sidebar"
                        className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                    >
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSeller;
