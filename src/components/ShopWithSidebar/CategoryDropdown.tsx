'use client';

import { useState, useEffect } from 'react';
import api from '@/axios/api';

const CategoryItem = ({ category, isSelected, onToggle }) => {
    return (
        <button
            className={`${
                isSelected && 'text-blue'
            } group flex items-center justify-between ease-out duration-200 hover:text-blue `}
            onClick={() => onToggle(category.id)}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
                        isSelected
                            ? 'border-blue bg-blue'
                            : 'bg-white border-gray-3'
                    }`}
                >
                    <svg
                        className={isSelected ? 'block' : 'hidden'}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                            stroke="white"
                            strokeWidth="1.94437"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <span>{category.categoryName}</span>
            </div>
        </button>
    );
};

const CategoryDropdown = ({ selectedCategories, onCategoryChange }) => {
    const [toggleDropdown, setToggleDropdown] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/Category/Client', {
                    params: {
                        page: 1,
                        pageSize: 100,
                    },
                });
                if (response.data.success) {
                    // Chỉ lấy các category cha (parentId === null)
                    const parentCategories = response.data.result.items.filter(
                        cat => cat.parentId === null
                    );
                    setCategories(parentCategories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleToggle = categoryId => {
        const newSelected = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];
        onCategoryChange(newSelected);
    };

    return (
        <div className="bg-white shadow-1 rounded-lg">
            <div
                onClick={e => {
                    e.preventDefault();
                    setToggleDropdown(!toggleDropdown);
                }}
                className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
                    toggleDropdown && 'shadow-filter'
                }`}
            >
                <p className="text-dark">Danh mục </p>
                <button
                    aria-label="button for category dropdown"
                    className={`text-dark ease-out duration-200 ${
                        toggleDropdown && 'rotate-180'
                    }`}
                >
                    <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            {/* dropdown menu */}
            <div
                className={`flex-col gap-3 py-6 pl-6 pr-5.5 max-h-[400px] overflow-y-auto ${
                    toggleDropdown ? 'flex' : 'hidden'
                }`}
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#3b82f6 #f1f1f1',
                }}
            >
                {loading ? (
                    <p className="text-sm text-gray-500">Đang tải...</p>
                ) : categories.length > 0 ? (
                    categories.map(category => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            isSelected={selectedCategories.includes(
                                category.id
                            )}
                            onToggle={handleToggle}
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-500">
                        Không có danh mục nào
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryDropdown;
