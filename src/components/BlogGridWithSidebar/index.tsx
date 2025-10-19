'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/axios/api';
import Breadcrumb from '../Common/Breadcrumb';
import BlogItem from '../Blog/BlogItem';
import SearchForm from '../Blog/SearchForm';
import LatestPosts from '../Blog/LatestPosts';

const BlogGridWithSidebar = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [pageSize] = useState(20);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [latestBlogs, setLatestBlogs] = useState([]);

    // Fetch blogs từ API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const params: {
                    page: number;
                    pageSize: number;
                    Search?: string;
                } = {
                    page: currentPage,
                    pageSize,
                };

                if (searchQuery) {
                    params.Search = searchQuery;
                }

                const response = await api.get('/api/News/Client', {
                    params,
                });

                if (response.data.success) {
                    setBlogs(response.data.result.items);
                    setCurrentPage(response.data.result.currentPage);
                    setTotalPages(response.data.result.totalPages);
                    setTotalCount(response.data.result.totalCount);
                    setHasPrevious(response.data.result.hasPrevious);
                    setHasNext(response.data.result.hasNext);
                } else {
                    throw new Error('API response unsuccessful');
                }
            } catch (err) {
                setError(err.message);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage, pageSize, searchQuery]);

    // Fetch latest 3 blogs for sidebar
    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await api.get('/api/News/Client', {
                    params: {
                        page: 1,
                        pageSize: 3,
                    },
                });

                if (response.data.success) {
                    setLatestBlogs(response.data.result.items);
                }
            } catch (err) {
                console.error('Error fetching latest blogs:', err);
            }
        };

        fetchLatestBlogs();
    }, []);

    const handlePageChange = page => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSearch = query => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Render pagination
    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages === 0) return pages;

        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxPagesToShow / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        // Trang đầu và ...
        if (startPage > 1) {
            pages.push(
                <li key={1}>
                    <button
                        onClick={() => handlePageChange(1)}
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                    >
                        1
                    </button>
                </li>
            );
            if (startPage > 2) {
                pages.push(
                    <li key="ellipsis-start">
                        <span className="flex py-1.5 px-3.5">...</span>
                    </li>
                );
            }
        }

        // Các trang ở giữa
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <button
                        onClick={() => handlePageChange(i)}
                        className={`flex py-1.5 px-3.5 duration-200 rounded-[3px] ${
                            i === currentPage
                                ? 'bg-blue text-white'
                                : 'hover:text-white hover:bg-blue'
                        }`}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        // ... và trang cuối
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <li key="ellipsis-end">
                        <span className="flex py-1.5 px-3.5">...</span>
                    </li>
                );
            }
            pages.push(
                <li key={totalPages}>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                    >
                        {totalPages}
                    </button>
                </li>
            );
        }

        return pages;
    };

    if (loading && currentPage === 1) {
        return (
            <>
                <Breadcrumb title={'Tất Cả Bài Viết'} pages={['Cẩm nang']} />
                <div className="overflow-hidden py-20 bg-gray-2 flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue border-t-transparent border-solid rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải bài viết...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Breadcrumb title={'Tất Cả Bài Viết'} pages={['Cẩm nang']} />
                <div className="overflow-hidden py-20 bg-gray-2">
                    <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 text-center">
                        <p className="text-red-500">Lỗi: {error}</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb title={'Tất Cả Bài Viết'} pages={['Cẩm nang']} />

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-col lg:flex-row gap-7.5">
                        {/* blog grid */}
                        <div className="lg:max-w-[770px] w-full">
                            {blogs.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-7.5">
                                        {blogs.map(blog => (
                                            <BlogItem
                                                blog={blog}
                                                key={blog.id}
                                            />
                                        ))}
                                    </div>

                                    {/* Blog Pagination Start */}
                                    {totalPages > 0 && (
                                        <div className="flex justify-center mt-15">
                                            <div className="bg-white shadow-1 rounded-md p-2">
                                                <ul className="flex items-center gap-1">
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    currentPage -
                                                                        1
                                                                )
                                                            }
                                                            aria-label="button for pagination left"
                                                            type="button"
                                                            disabled={
                                                                !hasPrevious
                                                            }
                                                            className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4 disabled:cursor-not-allowed"
                                                        >
                                                            <Image
                                                                src="/images/svg/pagination-left.svg"
                                                                alt="Previous"
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </button>
                                                    </li>

                                                    {renderPagination()}

                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    currentPage +
                                                                        1
                                                                )
                                                            }
                                                            aria-label="button for pagination right"
                                                            type="button"
                                                            disabled={!hasNext}
                                                            className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4 disabled:cursor-not-allowed"
                                                        >
                                                            <Image
                                                                src="/images/svg/pagination-right.svg"
                                                                alt="Next"
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {/* Blog Pagination End */}
                                </>
                            ) : (
                                <div className="bg-white shadow-1 rounded-lg p-10 text-center">
                                    <p className="text-gray-500 text-lg">
                                        Không tìm thấy bài viết nào
                                    </p>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="mt-4 px-6 py-2 bg-blue text-white rounded-md hover:bg-blue/90 transition-colors"
                                        >
                                            Xóa tìm kiếm
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* blog sidebar */}
                        <div className="lg:max-w-[370px] w-full">
                            {/* search box */}
                            <SearchForm onSearch={handleSearch} />

                            {/* Recent Posts box */}
                            <LatestPosts blogs={latestBlogs} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogGridWithSidebar;
