import { Link } from "react-router-dom";
import Location from "./svg/Location";
import Bedroom from "./svg/Bedroom";
import Area from "./svg/Area";
import Zipcode from "./svg/Zipcode";
import { formatPrice } from "./util/formatPrice";

export default function ListingCard({
  is_rental,
  imgUrl,
  price,
  location,
  bedrooms,
  area,
  zip_code,
  id,
  description,
}) {
  const formatedPrice = formatPrice(price);

  return (
    <Link
      to={`/listing/${id}`}
      className="transition-shadow duration-150 border hover:shadow-[5px_5px_12px_0px_#02152614] border-black/15 rounded-xl"
    >
      <div className="relative rounded-xl">
        <img
          className="rounded-t-xl aspect-[5/4] w-full"
          src={imgUrl}
          alt={description}
        />
        <p className="absolute px-4 py-2 text-sm font-bold text-white top-4 left-4 bg-black/40 rounded-3xl">
          {is_rental === 1 ? "ქირავდება" : "იყიდება"}
        </p>
      </div>
      <div className="p-6">
        <p className="text-3xl font-bold text-[#021526]">{formatedPrice} ₾</p>
        <p className="flex items-center gap-2 mt-2">
          <span>
            <Location />
          </span>
          <span className="text-[#021526B2]">{location}</span>
        </p>
        <ul className="flex gap-6 mt-4">
          <li className="text-[#021526B2] flex gap-2 items-center">
            <Bedroom />
            <span>{bedrooms}</span>
          </li>
          <li className="text-[#021526B2] flex gap-2 items-center">
            <Area />
            <span>
              {area} მ<sup>2</sup>
            </span>
          </li>
          <li className="text-[#021526B2] flex gap-2 items-center">
            <Zipcode />
            <span>{zip_code}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
}
