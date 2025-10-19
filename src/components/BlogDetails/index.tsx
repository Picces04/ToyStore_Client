'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Breadcrumb from '../Common/Breadcrumb';
import Image from 'next/image';
import api from '@/axios/api';
import '@/app/css/blog-content.css';

const BlogDetails = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const slug = params?.slug as string;
    const newsId = searchParams.get('id');
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                setLoading(true);

                if (!newsId) {
                    throw new Error('Không tìm thấy ID bài viết');
                }

                // Gọi trực tiếp API chi tiết với newsId
                const response = await api.get(`/api/News/${newsId}`);

                if (response.data.success) {
                    setBlog(response.data.result);
                } else {
                    throw new Error('Không tìm thấy bài viết');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (newsId) {
            fetchBlogDetail();
        }
    }, [newsId]);

    const getImageSrc = imageString => {
        try {
            if (!imageString) return '/images/noImage/waiting.png';
            const images = JSON.parse(imageString);
            return images[0] || '/images/noImage/waiting.png';
        } catch {
            return '/images/noImage/waiting.png';
        }
    };

    const formatDate = dateString => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <>
                <Breadcrumb
                    title={'Chi tiết bài viết'}
                    pages={['Chi Tiết Bài Viết']}
                />
                <div className="overflow-hidden py-20 bg-gray-2 flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue border-t-transparent border-solid rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải bài viết...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !blog) {
        return (
            <>
                <Breadcrumb
                    title={'Chi tiết bài viết'}
                    pages={['Chi Tiết Bài Viết']}
                />
                <div className="overflow-hidden py-20 bg-gray-2">
                    <div className="max-w-[750px] w-full mx-auto px-4 sm:px-8 xl:px-0 text-center">
                        <p className="text-red-500">
                            {error || 'Không tìm thấy bài viết'}
                        </p>
                    </div>
                </div>
            </>
        );
    }

    const imageSrc = getImageSrc(blog.image);

    return (
        <>
            <Breadcrumb
                title={'Chi tiết bài viết'}
                pages={['Chi tiết bài viết']}
            />
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1168px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="rounded-[10px] overflow-hidden mb-7.5 items-center">
                        <Image
                            className="rounded-[10px] w-full h-auto object-cover"
                            src={imageSrc}
                            alt={blog.title}
                            width={750}
                            height={477}
                            unoptimized={imageSrc.startsWith('http')}
                        />
                    </div>

                    <div>
                        <span className="flex items-center gap-3 mb-4 text-gray-500 text-sm">
                            <span>{formatDate(blog.createdOn)}</span>
                            <span className="block w-px h-4 bg-gray-4"></span>
                            <span>{blog.createdbyStr || 'Admin'}</span>
                        </span>

                        <h1 className="font-semibold text-dark text-xl lg:text-2xl xl:text-custom-4xl mb-6">
                            {blog.title}
                        </h1>

                        {/* Render HTML content with proper styling */}
                        <div
                            className="blog-content mb-8 text-justify"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            style={{
                                fontSize: '16px',
                                lineHeight: '1.8',
                                color: '#333',
                                textAlign: 'justify',
                            }}
                        />

                        {/* Social Share */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <p className="text-sm text-gray-600">
                                    Chia sẻ:
                                </p>
                                <a
                                    href="#"
                                    className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-[#1877F2] ease-in duration-200 hover:bg-opacity-95"
                                >
                                    <svg
                                        width="9"
                                        height="18"
                                        viewBox="0 0 9 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.13643 7H6.78036H6.29605V6.43548V4.68548V4.12097H6.78036H7.79741C8.06378 4.12097 8.28172 3.89516 8.28172 3.55645V0.564516C8.28172 0.254032 8.088 0 7.79741 0H6.02968C4.11665 0 2.78479 1.58064 2.78479 3.92339V6.37903V6.94355H2.30048H0.65382C0.314802 6.94355 0 7.25403 0 7.70564V9.7379C0 10.1331 0.266371 10.5 0.65382 10.5H2.25205H2.73636V11.0645V16.7379C2.73636 17.1331 3.00273 17.5 3.39018 17.5H5.66644C5.81174 17.5 5.93281 17.4153 6.02968 17.3024C6.12654 17.1895 6.19919 16.9919 6.19919 16.8226V11.0927V10.5282H6.70771H7.79741C8.11222 10.5282 8.35437 10.3024 8.4028 9.96371V9.93548V9.90726L8.74182 7.95968C8.76604 7.7621 8.74182 7.53629 8.59653 7.31048C8.54809 7.16935 8.33016 7.02823 8.13643 7Z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-[#00ACEE] ease-in duration-200 hover:bg-opacity-95"
                                >
                                    <svg
                                        width="18"
                                        height="14"
                                        viewBox="0 0 18 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.5524 2.26027L16.625 1.0274C16.9355 0.693493 17.0202 0.436644 17.0484 0.308219C16.2016 0.770548 15.4113 0.924658 14.9032 0.924658H14.7056L14.5927 0.821918C13.9153 0.282534 13.0685 0 12.1653 0C10.1895 0 8.6371 1.48973 8.6371 3.21062C8.6371 3.31336 8.6371 3.46747 8.66532 3.57021L8.75 4.0839L8.15726 4.05822C4.54435 3.95548 1.58065 1.13014 1.10081 0.642123C0.310484 1.92637 0.762097 3.15925 1.24194 3.92979L2.20161 5.36815L0.677419 4.5976C0.705645 5.67637 1.15726 6.52397 2.03226 7.14041L2.79435 7.65411L2.03226 7.93665C2.5121 9.24658 3.58468 9.78596 4.375 9.99144L5.41935 10.2483L4.43145 10.8647C2.85081 11.8921 0.875 11.8151 0 11.738C1.77823 12.8682 3.89516 13.125 5.3629 13.125C6.46371 13.125 7.28226 13.0223 7.47984 12.9452C15.3831 11.25 15.75 4.82877 15.75 3.54452V3.36473L15.9194 3.26199C16.879 2.44007 17.2742 2.00342 17.5 1.74658C17.4153 1.77226 17.3024 1.82363 17.1895 1.84932L15.5524 2.26027Z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-[#0376A8] ease-in duration-200 hover:bg-opacity-95"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.3442 0H1.12455C0.499798 0 0 0.497491 0 1.11936V14.3029C0 14.8999 0.499798 15.4222 1.12455 15.4222H14.2942C14.919 15.4222 15.4188 14.9247 15.4188 14.3029V1.09448C15.4688 0.497491 14.969 0 14.3442 0ZM4.57316 13.1089H2.29907V5.7709H4.57316V13.1089ZM3.42362 4.75104C2.67392 4.75104 2.09915 4.15405 2.09915 3.43269C2.09915 2.71133 2.69891 2.11434 3.42362 2.11434C4.14833 2.11434 4.74809 2.71133 4.74809 3.43269C4.74809 4.15405 4.19831 4.75104 3.42362 4.75104ZM13.1947 13.1089H10.9206V9.55183C10.9206 8.7061 10.8956 7.58674 9.72108 7.58674C8.52156 7.58674 8.34663 8.53198 8.34663 9.47721V13.1089H6.07255V5.7709H8.29665V6.79076H8.32164C8.64651 6.19377 9.37122 5.59678 10.4958 5.59678C12.8198 5.59678 13.2447 7.08925 13.2447 9.12897V13.1089H13.1947Z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetails;
