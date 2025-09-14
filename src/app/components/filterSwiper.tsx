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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedNewsType === categoryName
                      ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm hover:from-green-500 hover:to-green-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
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
