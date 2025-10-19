import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import type { BlogItem } from '@/types/blogItem';

const LatestPosts = ({ blogs }: { blogs: BlogItem[] }) => {
    // Parse image từ JSON string
    const getImageSrc = (imageString: string) => {
        try {
            if (!imageString) return '/images/noImage/waiting.png';
            const images = JSON.parse(imageString);
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

    return (
        <div className="shadow-1 bg-white rounded-xl mt-7.5">
            <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
                <h2 className="font-medium text-lg text-dark">
                    Bài viết gần đây
                </h2>
            </div>

            <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-6">
                    {blogs.length > 0 ? (
                        blogs.map(blog => (
                            <div
                                className="flex items-center gap-4"
                                key={blog.id}
                            >
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="max-w-[110px] w-full rounded-[10px] overflow-hidden flex-shrink-0"
                                >
                                    <Image
                                        src={getImageSrc(blog.image)}
                                        alt={blog.title}
                                        className="rounded-[10px] w-full object-cover"
                                        width={110}
                                        height={80}
                                        unoptimized={getImageSrc(
                                            blog.image
                                        ).startsWith('http')}
                                    />
                                </Link>

                                <div className="flex-1">
                                    <h3 className="text-dark leading-[22px] ease-out duration-200 mb-1.5 hover:text-blue line-clamp-2">
                                        <Link href={`/blogs/${blog.slug}`}>
                                            {blog.title}
                                        </Link>
                                    </h3>

                                    <span className="flex items-center gap-3">
                                        <span className="text-custom-xs text-gray-500">
                                            {formatDate(blog.createdOn)}
                                        </span>

                                        {/* divider */}
                                        <span className="block w-px h-4 bg-gray-4"></span>

                                        <span className="text-custom-xs text-gray-500">
                                            {blog.createdbyStr}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-sm">
                            Chưa có bài viết nào
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestPosts;
