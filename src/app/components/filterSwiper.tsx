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
    <div className="w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Swiper
          speed={200}
          freeMode
          spaceBetween={12}
          slidesPerView="auto"
          modules={[FreeMode]}
          className="w-full"
          style={{ width: "100%", overflow: "hidden" }}
        >
          {/* All News Tab */}
          <SwiperSlide style={{ width: "auto" }}>
            <button
              onClick={() => selectNewsType("")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedNewsType === ""
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All News
            </button>
          </SwiperSlide>

          {/* Category Tabs */}
          {categories &&
            categories.length > 0 &&
            categories.map((categoryName: string, i: number) => (
              <SwiperSlide
                key={i}
                style={{ width: "auto" }}
              >
                <button
                  onClick={() => selectNewsType(categoryName)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedNewsType === categoryName
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
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
