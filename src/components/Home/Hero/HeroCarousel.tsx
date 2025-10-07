'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css';

import Image from 'next/image';

const HeroCarousal = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="hero-carousel"
        >
            <SwiperSlide>
                <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/hero/hero-8.jpg"
                            alt="midautumn"
                            width={1362}
                            height={530}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/hero/hero-9.jpg"
                            alt="midautumn"
                            width={1362}
                            height={530}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/hero/hero-10.jpg"
                            alt="midautumn"
                            width={1362}
                            height={530}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/hero/hero-111.jpg"
                            alt="midautumn"
                            width={1362}
                            height={530}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/hero/hero-12.jpg"
                            alt="midautumn"
                            width={1362}
                            height={530}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/hero/hero-13.jpg"
                            alt="midautumn"
                            width={1362}
                            height={530}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HeroCarousal;
