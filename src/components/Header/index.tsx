'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { menuData } from './menuData';
import Dropdown from './Dropdown';
import { useAppSelector } from '@/redux/store';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@/redux/features/cart-slice';
import { useCartModalContext } from '@/app/context/CartSidebarModalContext';
import Image from 'next/image';
import {
    SearchIcon,
    UserIcon,
    CartIcon,
    WishlistIcon,
    RecentlyViewedIcon,
} from '@/components/Icons/icons'; // Import các SVG components

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [stickyMenu, setStickyMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Trạng thái để kiểm soát ẩn/hiện header
    const [lastScrollY, setLastScrollY] = useState(0); // Lưu vị trí cuộn trước đó
    const { openCartModal } = useCartModalContext();

    const product = useAppSelector(state => state.cartReducer.items);
    const totalPrice = useSelector(selectTotalPrice);

    const handleOpenCartModal = () => {
        openCartModal();
    };

    // Xử lý ẩn/hiện header và sticky menu khi cuộn
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Sticky menu (giữ nguyên logic hiện tại)
        if (currentScrollY >= 80) {
            setStickyMenu(true);
        } else {
            setStickyMenu(false);
        }

        // Xử lý ẩn/hiện header dựa trên hướng cuộn
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            // Cuộn xuống: ẩn header
            setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
            // Cuộn lên: hiện header
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY); // Cập nhật vị trí cuộn trước đó
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Dọn dẹp sự kiện
        };
    }, [lastScrollY]);

    return (
        <header
            className={`fixed left-0 top-0 w-full z-9999 bg-[#AFDDFF] transition-transform ease-in-out duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${stickyMenu ? 'shadow' : ''}`}
        >
            <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
                {/* <!-- header top start --> */}
                <div
                    className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
                        stickyMenu ? 'py-2' : 'py-3'
                    }`}
                >
                    {/* <!-- header top left --> */}
                    <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
                        <Link className="flex-shrink-0" href="/">
                            <Image
                                src="/images/logo/logo7.png"
                                alt="Logo"
                                width={160}
                                height={36}
                            />
                        </Link>

                        {/* Tìm kiếm */}
                        <div className="w-full lg:min-w-[870px] ">
                            <form>
                                <div className="flex items-center">
                                    <div className="relative sm:min-w-[333px] w-full">
                                        <input
                                            onChange={e =>
                                                setSearchQuery(e.target.value)
                                            }
                                            value={searchQuery}
                                            type="search"
                                            name="search"
                                            id="search"
                                            placeholder="Nhập từ khóa tìm kiếm..."
                                            autoComplete="off"
                                            className="w-full rounded-[8px] bg-gray-1 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                                        />

                                        <button
                                            id="search-btn"
                                            aria-label="Search"
                                            className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                                        >
                                            <SearchIcon className="fill-current" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* <!-- header top right --> */}
                    <div className="flex w-full lg:w-auto items-center gap-7.5">
                        {/* <!-- divider --> */}

                        <div className="flex w-full lg:w-auto justify-between items-center gap-5">
                            <div className="flex items-center gap-5">
                                <Link
                                    href="/signin"
                                    className="flex items-center gap-2.5"
                                >
                                    <UserIcon />
                                </Link>

                                <button
                                    onClick={handleOpenCartModal}
                                    className="flex items-center gap-2.5"
                                >
                                    <span className="inline-block relative">
                                        <CartIcon />
                                        <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                                            {product.length}
                                        </span>
                                    </span>
                                </button>
                            </div>

                            {/* <!-- Hamburger Toggle BTN --> */}
                            <button
                                id="Toggle"
                                aria-label="Toggler"
                                className="xl:hidden block"
                                onClick={() =>
                                    setNavigationOpen(!navigationOpen)
                                }
                            >
                                <span className="block relative cursor-pointer w-5.5 h-5.5">
                                    <span className="du-block absolute right-0 w-full h-full">
                                        <span
                                            className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                                                !navigationOpen &&
                                                '!w-full delay-300'
                                            }`}
                                        ></span>
                                        <span
                                            className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                                                !navigationOpen &&
                                                '!w-full delay-400'
                                            }`}
                                        ></span>
                                        <span
                                            className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                                                !navigationOpen &&
                                                '!w-full delay-500'
                                            }`}
                                        ></span>
                                    </span>

                                    <span className="block absolute right-0 w-full h-full rotate-45">
                                        <span
                                            className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                                                !navigationOpen &&
                                                '!h-0 delay-[0] '
                                            }`}
                                        ></span>
                                        <span
                                            className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                                                !navigationOpen &&
                                                '!h-0 dealy-200'
                                            }`}
                                        ></span>
                                    </span>
                                </span>
                            </button>
                            {/* <!-- Hamburger Toggle BTN --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- header top end --> */}
            </div>

            <div className="border-t-[2px] border-gray-3 bg-[#60B5FF]/100">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
                    <div className="flex items-center justify-between">
                        {/* <!--=== Main Nav Start ===--> */}
                        <div
                            className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                                navigationOpen &&
                                `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
                            }`}
                        >
                            {/* <!-- Main Nav Start --> */}
                            <nav>
                                <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-12">
                                    {menuData.map((menuItem, i) =>
                                        menuItem.submenu ? (
                                            <Dropdown
                                                key={i}
                                                menuItem={menuItem}
                                                stickyMenu={stickyMenu}
                                            />
                                        ) : (
                                            <li
                                                key={i}
                                                className=" group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                                            >
                                                <Link
                                                    href={menuItem.path}
                                                    className={`hover:text-blue text-custom-lg font-medium text-white flex ${
                                                        stickyMenu
                                                            ? 'xl:py-4'
                                                            : 'xl:py-6'
                                                    }`}
                                                >
                                                    {menuItem.title}
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </nav>
                            {/* <!-- Main Nav End --> */}
                        </div>
                        {/* <!--=== Main Nav End ===--> */}

                        {/* <!--=== Nav Right Start ===--> */}
                        <div className="hidden xl:block">
                            <ul className="flex items-center gap-5.5">
                                <li className="py-4">
                                    <a
                                        href="#"
                                        className="flex items-center gap-1.5 font-medium text-custom-md text-white hover:text-blue"
                                    >
                                        <RecentlyViewedIcon className="fill-current" />
                                        Đã xem gần đây
                                    </a>
                                </li>

                                <li className="py-4">
                                    <Link
                                        href="/wishlist"
                                        className="flex items-center gap-1.5 font-medium text-custom-md text-white hover:text-blue"
                                    >
                                        <WishlistIcon className="fill-current" />
                                        Yêu thích
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--=== Nav Right End ===--> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
