import ListingCard from "./Card";
import Skeleton from "./Skeleton";
import useRealEstate from "./hooks/useRealEstate";
import notFound from "../../assets/not-found.webp";
import { useFilterContext } from "../../contexts/FilterContext";

export default function Content() {
  const { data, loading, error } = useRealEstate();

  const { regions, price, area, bedroomNumber } = useFilterContext();

  if (error) {
    return (
      <section className="w-[1600px] mx-auto mt-12">
        <p className="text-lg text-[#021526CC]">
          რაღაც არასწორად წავიდა, გთხოვთ გადაამოწმოთ ინტერნეტ კავშირი
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="grid grid-cols-4 gap-5 w-[1600px] mx-auto mb-20 mt-12">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="w-[1600px] mx-auto">
        <p className="text-lg text-[#021526CC]">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </p>
      </section>
    );
  }

  const filteredData = data.filter((item) => {
    const priceMatch =
      (+item.price >= +price.min || price.min === 0) &&
      (+item.price <= +price.max || price.max === 0);

    const areaMatch =
      (+item.area >= +area.min || area.min === 0) &&
      (+item.area <= +area.max || area.max === 0);

    const regionMatch =
      regions.length === 0 || regions.includes(item.city?.region.name);

    const bedroomMatch =
      bedroomNumber === 0 || item.bedrooms === +bedroomNumber;

    return priceMatch && areaMatch && regionMatch && bedroomMatch;
  });

  return (
    <section className="grid grid-cols-4 gap-5 w-[1600px] mx-auto mb-20 mt-12">
      {filteredData.length === 0 && (
        <p className="text-lg text-[#021526CC]">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </p>
      )}

      {filteredData.map((item) => (
        <ListingCard
          imgUrl={item?.image || notFound}
          is_rental={item?.is_rental || 0}
          price={item?.price || 0}
          key={item?.id || Math.random()}
          id={item?.id || Math.random()}
          location={`${item?.city?.name || "უცნობი"}, ${item?.address || ""}`}
          bedrooms={item?.bedrooms || 0}
          area={item?.area || 0}
          zip_code={item?.zip_code || 0}
          description={item?.description || "სახლი გასაქირავებლად"}
        />
      ))}
    </section>
  );
}
