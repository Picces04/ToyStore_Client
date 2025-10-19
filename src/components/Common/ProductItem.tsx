'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useModalContext } from '@/app/context/QuickViewModalContext';
import { updateQuickView } from '@/redux/features/quickView-slice';
import { addItemToCart } from '@/redux/features/cart-slice';
import { addItemToWishlist } from '@/redux/features/wishlist-slice';
import { updateproductDetails } from '@/redux/features/product-details';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';

const ProductItem = ({ item }: { item: Product }) => {
    const { openModal } = useModalContext();
    const dispatch = useDispatch<AppDispatch>();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [hasImageError, setHasImageError] = useState(false);

    // Use the first image from the image array or a placeholder
    const imageSrc =
        item.image && item.image.length > 0
            ? item.image[0]
            : '/images/noImage/error.png';

    // Determine if there's a discount and calculate percentage
    const hasDiscount =
        item.promotion &&
        typeof item.promotion === 'object' &&
        'discountedPrice' in item.promotion;
    const discountedPrice = hasDiscount ? item.promotion.discountedPrice : null;
    const discountPercentage =
        hasDiscount && discountedPrice
            ? Math.round(((item.price - discountedPrice) / item.price) * 100)
            : 0;

    // Format price to VND
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Get supplier name
    const supplierName = item.supplier?.name || 'Không có nhà cung cấp';

    // Update the QuickView state
    const handleQuickViewUpdate = () => {
        dispatch(updateQuickView({ ...item }));
    };

    // Add to cart
    const handleAddToCart = () => {
        dispatch(
            addItemToCart({
                ...item,
                id: Number(item.id),
                quantity: 1,
                title: '',
                discountedPrice: 0,
            })
        );
    };

    // Add to wishlist
    const handleItemToWishList = () => {
        dispatch(
            addItemToWishlist({
                ...item,
                id: Number(item.id),
                quantity: 1,
                title: '',
                discountedPrice: 0,
            })
        );
    };

    // Update product details
    const handleProductDetails = () => {
        dispatch(updateproductDetails({ ...item }));
    };

    return (
        <div className="group h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-lg bg-[#F6F7FB] border-[2px] border-[#f2f2f2]">
                <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-white">
                    <Link
                        href={`/shop-details?id=${item.id}`}
                        className="relative flex h-[240px] items-center justify-center  bg-white"
                    >
                        {isImageLoading && !hasImageError && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                            </div>
                        )}
                        {hasImageError && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/images/noImage/error.png"
                                    alt="Error loading image"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                        )}
                        {hasDiscount && discountedPrice && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md text-custom-xs font-semibold shadow-md">
                                -{discountPercentage}%
                            </div>
                        )}
                        <Image
                            src={imageSrc}
                            alt={item.productName || 'Product'}
                            width={240}
                            height={240}
                            className={`object-contain transition-transform duration-300 group-hover:scale-[1.15] ${
                                isImageLoading || hasImageError
                                    ? 'opacity-0'
                                    : 'opacity-100'
                            }`}
                            onLoadingComplete={() => setIsImageLoading(false)}
                            onError={() => {
                                setIsImageLoading(false);
                                setHasImageError(true);
                            }}
                        />
                    </Link>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-6 pt-5">
                    <div className="mb-3 flex items-center justify-between text-custom-xs text-gray-500">
                        <span className="truncate" title={supplierName}>
                            {supplierName}
                        </span>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <Image
                                    key={index}
                                    src="/images/svg/star-filled.svg"
                                    alt="Star Icon"
                                    width={13}
                                    height={13}
                                    className="w-[13px] h-[13px]"
                                />
                            ))}
                            <span className="ml-1">(0)</span>
                        </div>
                    </div>

                    <h3
                        className="mb-2 text-base font-semibold text-dark transition-colors duration-200 hover:text-blue capitalize"
                        onClick={() => handleProductDetails()}
                    >
                        <Link href={`/shop-details/${item.slug}`}>
                            {item.productName}
                        </Link>
                    </h3>

                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-lg font-semibold text-dark">
                            {hasDiscount && discountedPrice
                                ? formatPrice(discountedPrice)
                                : formatPrice(item.price)}
                        </span>
                        {hasDiscount && discountedPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(item.price)}
                            </span>
                        )}
                    </div>

                    {hasDiscount &&
                        item.promotion &&
                        typeof item.promotion === 'object' &&
                        'name' in item.promotion && (
                            <span className="mb-4 text-custom-xs text-blue">
                                Khuyến mãi:{' '}
                                {item.promotion.name || 'Giảm giá đặc biệt'}
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
                            onClick={handleItemToWishList}
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

export default ProductItem;
