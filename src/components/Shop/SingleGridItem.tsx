'use client';
import React from 'react';
import { Product } from '@/types/product';
import { useModalContext } from '@/app/context/QuickViewModalContext';
import { updateQuickView } from '@/redux/features/quickView-slice';
import { addItemToCart } from '@/redux/features/cart-slice';
import { addItemToWishlist } from '@/redux/features/wishlist-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import Image from 'next/image';

const SingleGridItem = ({ item }: { item: Product }) => {
    const { openModal } = useModalContext();
    const dispatch = useDispatch<AppDispatch>();

    // Update the QuickView state
    const handleQuickViewUpdate = () => {
        dispatch(updateQuickView({ ...item }));
    };

    // Add to cart
    const handleAddToCart = () => {
        // dispatch(
        //     addItemToCart({
        //         ...item,
        //         quantity: 1,
        //     })
        // );
    };

    // Add to wishlist
    const handleItemToWishList = () => {
        // dispatch(
        //     addItemToWishlist({
        //         ...item,
        //         status: 'available',
        //         quantity: 1,
        //     })
        // );
    };

    // Tính giá khuyến mãi từ promotion (giả định promotion có discountedPrice)
    const discountedPrice = item.promotion?.discountedPrice
        ? item.promotion.discountedPrice
        : item.price; // Nếu không có promotion, dùng giá gốc

    // Format giá sang dạng Việt Nam (1.000.000 đ)
    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + ' đ';
    };

    return (
        <div className="group h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-lg bg-[#F6F7FB] border-[2px] border-[#f2f2f2]">
                <Link
                    href={`/shop-details?id=${item.id}`}
                    className="relative flex h-[240px] items-center justify-center overflow-hidden bg-white"
                >
                    <Image
                        src={item.image[0] || '/images/noImage/error.png'}
                        alt={item.productName}
                        width={240}
                        height={240}
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.15]"
                    />

                    {item.promotion && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md text-custom-xs font-semibold shadow-md">
                            Khuyến mãi
                        </div>
                    )}
                </Link>

                <div className="flex flex-1 flex-col px-4 pb-6 pt-5">
                    <div className="mb-3 flex items-center justify-between text-custom-xs text-gray-500">
                        <span className="truncate">
                            {item.supplier?.name || 'Không có nhà cung cấp'}
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

                    <h3 className="mb-2 text-base font-semibold text-dark transition-colors duration-200 hover:text-blue capitalize">
                        <Link href={`/shop-details/${item.slug}?id=${item.id}`}>
                            {item.productName}
                        </Link>
                    </h3>

                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-lg font-semibold text-dark">
                            {formatPrice(discountedPrice)}
                        </span>
                        {item.promotion && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(item.price)}
                            </span>
                        )}
                    </div>

                    {item.promotion && (
                        <span className="mb-4 text-custom-xs text-blue">
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
                            Thêm hàng
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

export default SingleGridItem;
