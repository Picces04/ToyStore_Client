'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useModalContext } from '@/app/context/QuickViewModalContext';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { addItemToCart } from '@/redux/features/cart-slice';
import { addItemToWishlist } from '@/redux/features/wishlist-slice';
import { useDispatch } from 'react-redux';
import { usePreviewSlider } from '@/app/context/PreviewSliderContext';
import { resetQuickView } from '@/redux/features/quickView-slice';
import { updateproductDetails } from '@/redux/features/product-details';
import { Product } from '@/types/product';

const QuickViewModal = () => {
    const { isModalOpen, closeModal } = useModalContext();
    const { openPreviewModal } = usePreviewSlider();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const product = useAppSelector(
        state => state.quickViewReducer.value
    ) as Product;
    const [activePreview, setActivePreview] = useState(0);

    // Determine if there's a discount and calculate percentage
    const hasDiscount =
        product.promotion &&
        typeof product.promotion === 'object' &&
        'discountedPrice' in product.promotion;
    const discountedPrice = hasDiscount
        ? product.promotion.discountedPrice
        : null;
    const discountPercentage =
        hasDiscount && discountedPrice
            ? Math.round(
                  ((product.price - discountedPrice) / product.price) * 100
              )
            : 0;

    // Handle preview modal
    const handlePreviewSlider = () => {
        dispatch(updateproductDetails(product));
        openPreviewModal();
    };

    // Add to cart
    const handleAddToCart = () => {
        dispatch(
            addItemToCart({
                ...product,
                id: Number(product.id),
                quantity: 1,
                title: '',
                discountedPrice: 0,
            })
        );
        closeModal();
    };

    // Add to wishlist
    const handleItemToWishlist = () => {
        dispatch(
            addItemToWishlist({
                ...product,
                id: Number(product.id),
                quantity: 1,
                title: '',
                discountedPrice: 0,
            })
        );
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                !(event.target instanceof Element) ||
                !event.target.closest('.modal-content')
            ) {
                closeModal();
            }
        }

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            setQuantity(1);
        };
    }, [isModalOpen, closeModal]);

    return (
        <div
            className={`${
                isModalOpen ? 'z-99999' : 'hidden'
            } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
        >
            <div className="flex items-center justify-center">
                <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
                    <button
                        onClick={() => closeModal()}
                        aria-label="button for close modal"
                        className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
                    >
                        <Image
                            src="/images/svg/close.svg"
                            alt="Close icon"
                            width={26}
                            height={26}
                            className="fill-current"
                        />
                    </button>

                    <div className="flex flex-wrap items-center gap-12.5">
                        <div className="max-w-[526px] w-full">
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-5">
                                    {product.image?.map((img, key) => (
                                        <button
                                            onClick={() =>
                                                setActivePreview(key)
                                            }
                                            key={key}
                                            className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 ease-out duration-200 hover:border-2 hover:border-blue ${
                                                activePreview === key &&
                                                'border-2 border-blue'
                                            }`}
                                        >
                                            {img ? (
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${key + 1}`}
                                                    width={61}
                                                    height={61}
                                                    className="aspect-square"
                                                />
                                            ) : (
                                                <div className="w-[61px] h-[61px] bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                    No Img
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                                    {hasDiscount && discountedPrice && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                            -{discountPercentage}%
                                        </div>
                                    )}
                                    <button
                                        onClick={handlePreviewSlider}
                                        aria-label="button for zoom"
                                        className="gallery__Image w-10 h-10 rounded-[5px] bg-white shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-8 right-4 lg:right-8 z-50"
                                    >
                                        <Image
                                            src="/images/svg/zoom.svg"
                                            alt="Zoom icon"
                                            width={22}
                                            height={22}
                                            className="fill-current"
                                        />
                                    </button>
                                    {product?.image?.[activePreview] ? (
                                        <Image
                                            src={product.image[activePreview]}
                                            alt={
                                                product.productName || 'Product'
                                            }
                                            width={400}
                                            height={400}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-[400px] h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">
                                            <Image
                                                src={
                                                    '/images/noImage/error.png'
                                                }
                                                alt=""
                                                width={300}
                                                height={300}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[445px] w-full">
                            <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                                {product.productName || 'Tên sản phẩm'}
                            </h3>

                            <div className="flex flex-wrap items-center gap-5 mb-6">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-1">
                                        {[...Array(3)].map((_, index) => (
                                            <Image
                                                key={index}
                                                src="/images/svg/star-filled.svg"
                                                alt="Star filled"
                                                width={18}
                                                height={18}
                                                className="fill-[#FFA645]"
                                            />
                                        ))}
                                        {[...Array(2)].map((_, index) => (
                                            <Image
                                                key={index + 3}
                                                src="/images/svg/star-empty.svg"
                                                alt="Star empty"
                                                width={18}
                                                height={18}
                                                className="fill-gray-4"
                                            />
                                        ))}
                                    </div>
                                    <span>
                                        <span className="font-medium text-dark">
                                            4.7 Rating
                                        </span>
                                        <span className="text-dark-2">
                                            (5 reviews)
                                        </span>
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/images/svg/in-stock.svg"
                                        alt="In stock icon"
                                        width={20}
                                        height={20}
                                        className="fill-[#22AD5C]"
                                    />
                                    <span className="font-medium text-dark">
                                        Còn hàng
                                    </span>
                                </div>
                            </div>

                            <p className="mb-6">
                                {product.description ||
                                    'Không có mô tả sản phẩm.'}
                            </p>

                            <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                                <div>
                                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                                        Giá
                                    </h4>
                                    <span className="flex items-center gap-2">
                                        <span className="font-semibold text-dark text-xl xl:text-heading-4">
                                            {(hasDiscount && discountedPrice
                                                ? discountedPrice
                                                : product.price
                                            )?.toLocaleString('vi-VN')}
                                            ₫
                                        </span>
                                        {hasDiscount && discountedPrice && (
                                            <span className="font-medium text-dark-4 text-lg line-through">
                                                {product.price?.toLocaleString(
                                                    'vi-VN'
                                                )}
                                                ₫
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                                        Số lượng
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                quantity > 1 &&
                                                setQuantity(quantity - 1)
                                            }
                                            aria-label="button for remove product"
                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                                            disabled={quantity <= 1}
                                        >
                                            <Image
                                                src="/images/svg/minus.svg"
                                                alt="Minus icon"
                                                width={16}
                                                height={2}
                                                className="fill-current"
                                            />
                                        </button>
                                        <span className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                            aria-label="button for add product"
                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                                        >
                                            <Image
                                                src="/images/svg/plus.svg"
                                                alt="Plus icon"
                                                width={16}
                                                height={16}
                                                className="fill-current"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    disabled={quantity === 0}
                                    onClick={() => handleAddToCart()}
                                    className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                                <button
                                    onClick={() => handleItemToWishlist()}
                                    className="inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
                                >
                                    <Image
                                        src="/images/svg/wishlist.svg"
                                        alt="Wishlist icon"
                                        width={20}
                                        height={20}
                                        className="fill-current"
                                    />
                                    Yêu thích
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
