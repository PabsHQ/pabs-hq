import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type FilterSwiperProps = {
  categories: string[];
  selectedNewsType: string;
  selectNewsType: (val: string) => void;
};

export default function FilterSwiper({
  categories,
  selectedNewsType,
  selectNewsType,
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
    <div className="w-full">
      <div className="overflow-hidden">
        <Swiper
          speed={300}
          freeMode
          spaceBetween={12}
          slidesPerView="auto"
          modules={[FreeMode]}
          className="w-full py-2"
        >
          {categories &&
            categories.length > 0 &&
            categories.map((categoryName: string, i: number) => (
              <SwiperSlide
                key={i}
                style={{ width: "auto" }}
                onClick={() => selectNewsType(categoryName)}
              >
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedNewsType === categoryName
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:from-orange-600 hover:to-orange-700"
                      : "bg-[#2a2a2a] text-gray-300 hover:bg-[#404040] border border-[#404040]"
                  }`}
                  aria-pressed={selectedNewsType === categoryName}
                  aria-label={`Filter by ${displayText(categoryName)}`}
                >
                  {displayText(categoryName)}
                </button>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
