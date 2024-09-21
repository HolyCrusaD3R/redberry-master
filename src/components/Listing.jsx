import { useFilterContext } from "../contexts/FilterContext";
import FiltersBar from "./FiltersBar";
import Filter from "./listing/Filter";

function Listing() {
  const {
    regions,
    price,
    area,
    bedroomNumber,
    resetFilters,
    changeRegions,
    changePrice,
    changeArea,
    changeBedroomNumber,
  } = useFilterContext();

  const areFiltersApplied = !!(
    regions.length ||
    price.min ||
    price.max ||
    area.min ||
    area.max ||
    bedroomNumber
  );

  return (
    <div className="mx-auto w-[1600px]">
      <div className="mt-[77px]">
        <FiltersBar />
      </div>
      {areFiltersApplied && (
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {regions.map((region, i) => (
            <Filter
              data={regions}
              regionName={region}
              deleteFilter={changeRegions}
              key={region + i}
              type={"region"}
            >
              {region}
            </Filter>
          ))}
          {(price.min !== 0 || price.max !== 0) && (
            <Filter deleteFilter={changePrice} type={"price"}>
              {price.min}₾ - {price.max}₾
            </Filter>
          )}
          {(area.min !== 0 || area.max !== 0) && (
            <Filter deleteFilter={changeArea} type={"area"}>
              {area.min} მ<sup>2</sup> - {area.max} მ<sup>2</sup>
            </Filter>
          )}
          {bedroomNumber !== 0 && (
            <Filter deleteFilter={changeBedroomNumber} type={"roomNumber"}>
              {bedroomNumber}
            </Filter>
          )}
          <button
            onClick={resetFilters}
            className="text-[#021526] font-medium text-sm hover:opacity-80 transition-opacity duration-150"
          >
            გასუფთავება
          </button>
        </div>
      )}
    </div>
  );
}

export default Listing;
