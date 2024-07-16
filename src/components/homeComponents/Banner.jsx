import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const Banner = () => {
    return (
        <div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className=''>
                        <img src="./banner3.png" alt="" className='object-cover'/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=''>
                        <img src="./banner2.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=''>
                        <img src="./banner1.png" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;