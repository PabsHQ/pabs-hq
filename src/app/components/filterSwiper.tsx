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
                  className={`filter-tab w-full min-w-[190px] h-12 flex justify-center items-center shadow-md ${
                    selectedNewsType === categoryName
                      ? "active bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
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
