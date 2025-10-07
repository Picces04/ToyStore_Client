import React from 'react';
import Image from 'next/image';

const featureData = [
    {
        img: '/images/icons/icon-01.svg',
        title: 'Miễn Phí Vận Chuyển',
        description: 'Cho mọi đơn hàng trên 500k',
    },
    {
        img: '/images/icons/icon-03.svg',
        title: '100% Thanh Toán An Toàn',
        description: 'Đảm bảo an toàn tuyệt đối',
    },
    {
        img: '/images/icons/icon-04.svg',
        title: '24/7 Hỗ Trợ',
        description: 'Bất cứ lúc nào bạn cần',
    },
];

const HeroFeature = () => {
    return (
        <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
                {featureData.map((item, key) => (
                    <div className="flex items-center gap-4" key={key}>
                        <Image
                            src={item.img}
                            alt="icons"
                            width={40}
                            height={41}
                        />

                        <div>
                            <h3 className="font-medium text-lg text-dark">
                                {item.title}
                            </h3>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroFeature;
