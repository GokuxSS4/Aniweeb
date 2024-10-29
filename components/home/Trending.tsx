"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiAnime } from "aniwatch";

import { Header } from "@/components/common/Header";

function TrendingAnimeCard({ anime }: { anime: HiAnime.TrendingAnime }) {
  return (
    <div className="transform transition-transform duration-500 hover:-translate-y-2 group">
      <div className="w-[calc(16.66% - 1rem)] gap-2 p-2 flex flex-col flex-shrink-0">
        <div className="w-full aspect-[2/3] overflow-hidden relative">
          <img
            src={anime.poster || ""}
            alt={anime.name || "failed to retrive image"}
            className="rounded-md h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-1 left-1">
            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg">
              <span className="text-white font-semibold text-sm">
                #{anime.rank}
              </span>
            </div>
          </div>
        </div>

        <p className="line-clamp-1 text-white text-sm">{anime.name}</p>
      </div>
    </div>
  );
}

const TrendingCardSkeleton = () => {
  return (
    <div className="min-w-[16.66%] px-2">
      <div className="transform transition-transform duration-500 hover:cursor-pointer">
        <div className="w-full aspect-[2/3] overflow-hidden relative">
          <div className="h-full w-full rounded-md bg-[#141414] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

function LoadingCards({ noOfCards }: { noOfCards: number }) {
  console.log("Loading cards", noOfCards);
  return (
    <div className="flex h-full">
      {Array.from({ length: noOfCards }).map((_, index) => (
        <TrendingCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function Trending({ aniList }: { aniList: HiAnime.TrendingAnime[] }) {
  const sliderRef = useRef<Slider>(null);

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
    const handleResize = () => {
      updateSlidesToShow();
    };

    window.addEventListener("resize", handleResize);
    setIsloading(false);

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
    <div className="w-full h-full">
      <Header title={"Trending"} />
      <div className="slider-container relative">
        <div className="w-full px-8 relative">
          {isLoading ? (
            <LoadingCards noOfCards={slidesToShow} />
          ) : (
            <>
              <Slider ref={sliderRef} {...settings}>
                {aniList.map((anime: HiAnime.TrendingAnime) => (
                  <TrendingAnimeCard anime={anime} key={anime.id} />
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

