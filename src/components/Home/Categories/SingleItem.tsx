import { Category } from '@/types/category';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SingleItem = ({ item }: { item: Category }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Xử lý URL ảnh từ API
    const getImageSrc = () => {
        if (!item.image) {
            return '/images/noImage/waiting.png';
        }

        // Nếu image đã là URL đầy đủ (http/https)
        if (
            item.image.startsWith('http://') ||
            item.image.startsWith('https://')
        ) {
            return item.image;
        }

        // Nếu image là đường dẫn tương đối từ API, thêm base URL
        const baseURL =
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            'https://cua-hang-do-choi-be.onrender.com';
        return `${baseURL}${item.image}`;
    };

    const imageSrc = getImageSrc();

    return (
        <Link
            href={`/shop-with-sidebar?category=${item.id}`}
            className="group flex flex-col items-center"
        >
            <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 relative">
                {isLoading && !hasError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-red-500 text-sm">
                            <Image
                                src={'/images/noImage/error.png'}
                                alt={item.categoryName || 'Category'}
                                width={150}
                                height={150}
                            />
                        </span>
                    </div>
                )}
                <Image
                    src={imageSrc}
                    alt={item.categoryName || 'Category'}
                    width={82}
                    height={62}
                    className={`object-contain ${
                        isLoading || hasError ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoadingComplete={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                    unoptimized={imageSrc.startsWith('http')}
                />
            </div>

            <div className="flex justify-center">
                <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                    {item.categoryName}
                </h3>
            </div>
        </Link>
    );
};

export default SingleItem;
