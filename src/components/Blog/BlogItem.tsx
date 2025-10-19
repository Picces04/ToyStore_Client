import React from 'react';
import type { BlogItem } from '@/types/blogItem';
import Image from 'next/image';
import Link from 'next/link';

const BlogItemComponent = ({ blog }: { blog: BlogItem }) => {
    // Parse image array từ string JSON
    const getImageSrc = () => {
        try {
            if (!blog.image) return '/images/noImage/waiting.png';
            const images = JSON.parse(blog.image);
            return images[0] || '/images/noImage/waiting.png';
        } catch {
            return '/images/noImage/waiting.png';
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    // Get excerpt from HTML content
    const getExcerpt = (htmlContent: string, maxLength: number = 150) => {
        // Decode HTML entities
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';

        return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
    };

    return (
        <div className="group">
            <Link
                href={`/blogs/blog-details?id=${blog.id}`}
                className="block overflow-hidden rounded-[10px] mb-5 relative h-[220px]"
            >
                <Image
                    src={getImageSrc()}
                    alt={blog.title}
                    className="rounded-md w-full h-full object-cover transition-transform duration-300 ease-out "
                    width={160}
                    height={160}
                    unoptimized={getImageSrc().startsWith('http')}
                />
            </Link>

            <div className="mt-5.5">
                <span className="flex items-center gap-3 mb-2.5">
                    <span className="text-custom-sm text-gray-500">
                        {formatDate(blog.createdOn)}
                    </span>

                    {/* divider */}
                    <span className="block w-px h-4 bg-gray-4"></span>

                    <span className="text-custom-sm text-gray-500">
                        {blog.createdbyStr}
                    </span>
                </span>

                <h4>
                    <Link
                        href={`/blogs/blog-details?id=${blog.id}`}
                        className="inline-block font-medium text-dark text-base sm:text-lg lg:text-xl hover:text-blue ease-out duration-200"
                    >
                        {blog.title}
                    </Link>
                </h4>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {getExcerpt(blog.content)}
                </p>

                <Link
                    href={`/blogs/blog-details?id=${blog.id}`}
                    className="text-custom-sm inline-flex items-center gap-2 py-2 ease-out duration-200 hover:text-blue"
                >
                    Đọc thêm
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.1023 4.10225C10.3219 3.88258 10.6781 3.88258 10.8977 4.10225L15.3977 8.60225C15.6174 8.82192 15.6174 9.17808 15.3977 9.39775L10.8977 13.8977C10.6781 14.1174 10.3219 14.1174 10.1023 13.8977C9.88258 13.6781 9.88258 13.3219 10.1023 13.1023L13.642 9.5625H3C2.68934 9.5625 2.4375 9.31066 2.4375 9C2.4375 8.68934 2.68934 8.4375 3 8.4375H13.642L10.1023 4.89775C9.88258 4.67808 9.88258 4.32192 10.1023 4.10225Z"
                            fill=""
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default BlogItemComponent;
