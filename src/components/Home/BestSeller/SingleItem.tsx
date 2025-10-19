'use client';

import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { addItemToCart } from '@/redux/features/cart-slice';
import { addItemToWishlist } from '@/redux/features/wishlist-slice';
import { useModalContext } from '@/app/context/QuickViewModalContext';
import { updateQuickView } from '@/redux/features/quickView-slice';
import type { BestSellerProduct } from '../../../types/BestSellerProduct';

const FALLBACK_IMAGE = '/images/noImage/waiting.png';

const SingleItem: React.FC<{ item: BestSellerProduct }> = ({ item }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { openModal } = useModalContext();

    const imageList = useMemo(() => {
        if (!item.image) return [] as string[];
        if (Array.isArray(item.image)) return item.image;

        if (typeof item.image === 'string' && item.image.trim()) {
            try {
                const parsed = JSON.parse(item.image);
                if (Array.isArray(parsed)) {
                    return parsed.filter(
                        (src): src is string => typeof src === 'string'
                    );
                }
                if (typeof parsed === 'string') {
                    return [parsed];
                }
            } catch {
                return [item.image];
            }
        }

        return [] as string[];
    }, [item.image]);

    const coverImage = imageList[0] ?? FALLBACK_IMAGE;
    const productLink = item.slug ? `/shop-details/${item.slug}` : '#';
    const numericId = useMemo(() => {
        return item.id
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }, [item.id]);

    const formattedPrice = useMemo(() => {
        const value = Number.isFinite(item.price) ? item.price : 0;
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(value);
    }, [item.price]);

    const supplierName = item.supplier?.name ?? 'Không rõ nhà cung cấp';

    const handleQuickViewUpdate = () => {
        dispatch(
            updateQuickView({
                id: numericId,
                title: item.productName,
                price: item.price,
                discountedPrice: item.price,
                imgs: {
                    thumbnails: imageList,
                    previews: imageList,
                },
                colors: [],
                sizes: [],
                category:
                    item.category?.childName ||
                    item.category?.parentName ||
                    'Uncategorized',
                tags: [],
                reviews: 0,
                description: item.description || '',
            })
        );
    };

    const handleAddToCart = () => {
        dispatch(
            addItemToCart({
                id: numericId,
                title: item.productName,
                price: item.price,
                discountedPrice: item.price,
                quantity: 1,
                imgs: {
                    thumbnails: imageList,
                    previews: imageList,
                },
            })
        );
    };

    const handleAddToWishlist = () => {
        dispatch(
            addItemToWishlist({
                id: numericId,
                title: item.productName,
                price: item.price,
                discountedPrice: item.price,
                quantity: 1,
                status: item.productStatus === 0 ? 'Tạm hết hàng' : 'Còn hàng',
                imgs: {
                    thumbnails: imageList,
                    previews: imageList,
                },
            })
        );
    };

    return (
        <div className="group h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-lg bg-[#F6F7FB] border-[2px] border-[#f2f2f2]">
                <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-white">
                    <Image
                        src={coverImage}
                        alt={item.productName}
                        width={240}
                        height={240}
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.15]"
                        unoptimized={coverImage.startsWith('http')}
                    />
                </div>

                <div className="flex flex-1 flex-col px-4 pb-6 pt-5">
                    <div className="mb-3 flex items-center justify-between text-custom-xs text-gray-500">
                        <span className="truncate" title={supplierName}>
                            {supplierName}
                        </span>
                        <span>Còn lại: {item.quantity}</span>
                    </div>

                    <h3 className="mb-2 text-base font-semibold text-dark transition-colors duration-200 hover:text-blue">
                        <Link href={productLink}>{item.productName}</Link>
                    </h3>

                    <div className="mb-4 text-lg font-semibold text-dark">
                        {formattedPrice}
                    </div>

                    {item.promotion?.name && (
                        <span className="mb-4 text-custom-xs text-blue">
                            Khuyến mãi: {item.promotion.name}
                        </span>
                    )}

                    <div className="mt-auto flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                openModal();
                                handleQuickViewUpdate();
                            }}
                            aria-label="button for quick view"
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                        >
                            <Image
                                src="/images/svg/quick-view-icon.svg"
                                alt="Quick View"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            type="button"
                            onClick={handleAddToWishlist}
                            aria-label="button for favorite select"
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                        >
                            <Image
                                src="/images/svg/wishlist.svg"
                                alt="Add to Wishlist"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleItem;
