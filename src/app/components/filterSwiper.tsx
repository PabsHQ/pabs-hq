import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type FilterSwiperProps = {
  categories: string[];
  selectedNewsType: string;
  selectNewsType: (val: string) => void;
  containerWidth: number | null;
};

export default function FilterSwiper({
  categories,
  selectedNewsType,
  selectNewsType,
  containerWidth,
}: FilterSwiperProps) {
  const displayText = (text: string) => {
    switch (text) {
      case "chainNews":
        return "Chain News";
      case "theBuzz":
        return "The Buzz";
      case "trenches":
        return "Trenches";
      case "lore":
        return "Lore";
      default:
        return "Playbook";
    }
  };

  return (
    <div className="w-full overflow-hidden px-4">
      <div
        className=" mx-auto"
        style={{
          width: containerWidth ? `calc(${containerWidth}px - 100px)` : "100%",
        }}
      >
        <Swiper
          speed={200}
          freeMode
          spaceBetween={10}
          slidesPerView="auto"
          modules={[FreeMode]}
          className="w-full py-4"
          style={{ width: "100%", overflow: "hidden" }}
        >
          {categories &&
            categories.length > 0 &&
            categories.map((categoryName: string, i: number) => (
              <SwiperSlide
                key={i}
                style={{ width: "auto", maxWidth: "200px" }}
                onClick={() => selectNewsType(categoryName)}
              >
                <div
                  className={`${
                    selectedNewsType === categoryName
                      ? "bg-[#3EEE99] text-white hover:bg-green-300"
                      : "bg-white text-black hover:bg-gray-100 rounded-[12px] w-full h-[40px] flex justify-center items-center font-semibold cursor-pointer  hover:shadow-md transition-all duration-300 "
                  } rounded-[12px] w-full min-w-[190px] h-[40px] flex justify-center items-center font-semibold cursor-pointer shadow-md hover:shadow-md transition-all duration-300`}
                >
                  {displayText(categoryName)}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
