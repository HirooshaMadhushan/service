import React, { useState, useEffect } from "react";
import img1 from "../../assets/1.jpg"; // Replace with your actual image paths
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const carouselData = [
  {
    image: img1,
    title: "Experience Nature",
    description: "Discover the beauty of untouched landscapes",
    buttonText: "Explore Now"
  },
  {
    image: img1,
    title: "Adventure Awaits",
    description: "Embark on a journey of discovery and wonder",
    buttonText: "Learn More"
  },
  {
    image: img1,
    title: "Peaceful Retreat",
    description: "Find your sanctuary away from the busy world",
    buttonText: "Book Now"
  },
  {
    image: img1,
    title: "Scenic Views",
    description: "Breathtaking vistas that will inspire your soul",
    buttonText: "View Gallery"
  }
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlaying]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-screen  overflow-hidden -ml-34.5">
      {/* Carousel Wrapper */}
      <div className="relative w-screen h-64 md:h-96 lg:h-[32rem]">
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-screen h-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image */}
            <img
              src={slide.image}
              className="object-cover w-screen h-full"
              alt={`Slide ${index + 1}`}
            />

            {/* Corner Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4">
                <div className="w-12 h-1 bg-white"></div>
                <div className="w-1 h-12 bg-white"></div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-1 bg-white"></div>
                <div className="absolute top-0 right-0 w-1 h-12 bg-white"></div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-12 h-1 bg-white"></div>
                <div className="absolute bottom-0 left-0 w-1 h-12 bg-white"></div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-12 h-1 bg-white"></div>
                <div className="absolute bottom-0 right-0 w-1 h-12 bg-white"></div>
              </div>
            </div>

            {/* Overlay and Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="mb-2 text-2xl font-bold md:text-4xl">{slide.title}</h2>
                <p className="mb-4 text-sm text-gray-200 md:text-base">{slide.description}</p>
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 rounded hover:bg-blue-700">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-white w-6"
                : "bg-gray-400 w-3 bg-opacity-60 hover:bg-opacity-100"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Controls */}
      <button
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
          <FaChevronLeft className="w-5 h-5 text-white" />
        </span>
      </button>
      <button
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
          <FaChevronRight className="w-5 h-5 text-white" />
        </span>
      </button>
    </div>
  );
};

export default Carousel;
