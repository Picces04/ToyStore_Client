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

const SingleListItem = ({ item }: { item: Product }) => {
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
        <div className="group rounded-lg bg-white shadow-1">
            <div className="flex">
                <Link
                    href={`/shop-details?id=${item.id}`}
                    className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4"
                >
                    <Image
                        src={item.image[0] || '/images/noImage/error.png'}
                        alt={item.productName}
                        width={250}
                        height={250}
                        className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.15]"
                    />

                    {item.promotion && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md text-custom-xs font-semibold shadow-md">
                            Khuyến mãi
                        </div>
                    )}
                </Link>

                <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
                    <div className="flex-1">
                        <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
                            <Link href={`/shop-details?id=${item.id}`}>
                                {item.productName}
                            </Link>
                        </h3>
                        <span className="truncate pb-2 block">
                            {item.supplier?.name || 'Không có nhà cung cấp'}
                        </span>

                        <span className="flex items-center gap-2 font-medium text-[30px] mb-4 mt-4">
                            <span className="text-dark">
                                {formatPrice(discountedPrice)}
                            </span>
                            {item.promotion && (
                                <span className="text-dark-4 line-through">
                                    {formatPrice(item.price)}
                                </span>
                            )}
                        </span>

                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <Image
                                        key={index}
                                        src="/images/svg/star-empty.svg"
                                        alt="Star Icon"
                                        width={15}
                                        height={15}
                                        className="w-[15px] h-[15px]"
                                    />
                                ))}
                            </div>
                            <p className="text-custom-sm">(0)</p>
                        </div>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                        <button
                            onClick={() => {
                                openModal();
                                handleQuickViewUpdate();
                            }}
                            aria-label="button for quick view"
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-gray-1 hover:text-white hover:bg-blue"
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
                            onClick={() => handleAddToCart()}
                            className="inline-flex items-center justify-center font-medium text-custom-sm py-2 px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark whitespace-nowrap"
                        >
                            Thêm hàng
                        </button>

                        <button
                            onClick={() => handleItemToWishList()}
                            aria-label="button for favorite select"
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-gray-1 hover:text-white hover:bg-blue"
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

export default SingleListItem;
