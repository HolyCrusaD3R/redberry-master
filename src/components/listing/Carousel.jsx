import ListingCard from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import LeftArrow from "./svg/LeftArrow";
import RightArrow from "./svg/RightArrow";

export default function Carousel({ data }) {
  return (
    <div className="relative mt-4">
      <button className="absolute z-20 -translate-y-1/2 top-1/2 custom-prev -left-14">
        <LeftArrow />
      </button>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={15}
        slidesPerView={4}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
      >
        {data.map((item) => (
          <SwiperSlide key={item?.id || Math.random()}>
            <ListingCard
              imgUrl={item?.image || notFound}
              is_rental={item?.is_rental || 0}
              price={item?.price || 0}
              key={item?.id || Math.random()}
              id={item?.id || Math.random()}
              location={`${item?.city?.name || "უცნობი"}, ${
                item?.address || ""
              }`}
              bedrooms={item?.bedrooms || 0}
              area={item?.area || 0}
              zip_code={item?.zip_code || 0}
              description={item?.description || "სახლი გასაქირავებლად"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="absolute z-20 -translate-y-1/2 custom-next top-1/2 -right-14">
        <RightArrow />
      </button>
    </div>
  );
}
