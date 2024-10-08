"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export function Trending({ aniList }: { aniList: any }) {
  const sliderRef = useRef(null);

  const next = () => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const [isLoading, setIsloading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(6);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;

    if (width < 500) {
      setSlidesToShow(1);
    } else if (width < 700) {
      setSlidesToShow(2);
    } else if (width < 900) {
      setSlidesToShow(3);
    } else if (width < 1100) {
      setSlidesToShow(4);
    } else if (width < 1356) {
      setSlidesToShow(5);
    } else {
      setSlidesToShow(6);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    setIsloading(false);

    const handleResize = () => {
      updateSlidesToShow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    beforeChange: (current: any, next: any) => {
      setCurrentSlide(next);
    },
  };

  const numItems = aniList.length;
  const showPrevArrow = currentSlide > 0;
  const showNextArrow = currentSlide + settings.slidesToShow < numItems;

  return (
    <div className="w-full h-full p-3">
      <div className="inline-flex gap-2 items-stretch mb-4">
        <div className="flex-grow w-2 bg-purple-500 rounded-full"></div>
        <p className="text-2xl font-bold">Trending Anime</p>
      </div>
      <div className="slider-container relative">
        <div className="w-full px-8 relative">
          {!isLoading && (
            <>
              <Slider
                ref={(slider: any) => {
                  sliderRef.current = slider;
                }}
                {...settings}
              >
                {aniList.map((anime: any) => (
                  <div
                    key={anime.id}
                    className="transform transition-transform duration-500 hover:-translate-y-2 group"
                  >
                    <div className="w-48 gap-2 p-2 flex flex-col flex-shrink-0">
                      <img
                        src={anime.poster}
                        alt={anime.name}
                        className="rounded-md h-60"
                        loading="lazy"
                      />

                      <p className="line-clamp-2 text-white text-sm">
                        <span className="font-bold text-purple-400 mr-2">
                          #{anime.rank}
                        </span>
                        {anime.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>

              <button
                onClick={previous}
                disabled={!showPrevArrow}
                className={`absolute left-0 top-[45%] bg-opacity-75 transform -translate-y-1/2 rounded-full p-3 text-white flex items-center justify-center transition-all duration-200 
              ${!showPrevArrow && "invisible"}`}
              >
                <FaChevronLeft size={24} />
              </button>

              <button
                onClick={next}
                disabled={!showNextArrow}
                className={`absolute right-0 top-[45%] bg-opacity-75 transform -translate-y-1/2 rounded-full p-3 text-white flex items-center justify-center transition-all duration-200
              ${!showNextArrow && "invisible"}`}
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
