"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    title: "Find Your Perfect Co-Founder",
    subtitle:
      "Connect with developers, designers, marketers, and entrepreneurs to build your dream startup.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    title: "Turn Ideas Into Reality",
    subtitle:
      "Share innovative startup ideas, validate them with the community, and start building together.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    title: "Build. Launch. Grow.",
    subtitle:
      "Collaborate with talented people, attract investors, and scale your startup successfully.",
  },
];

export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[550px] w-full overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-white">
                <h2 className="text-4xl md:text-6xl font-bold max-w-2xl">
                  {slide.title}
                </h2>

                <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl">
                  {slide.subtitle}
                </p>

                <button className="mt-8 px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition font-semibold">
                  Explore Startup Ideas
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}