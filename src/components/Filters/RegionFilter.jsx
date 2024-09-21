import React, { useState } from "react";
import { useFilterContext } from "../../contexts/FilterContext";

const regions = [
  "ქვემო ქართლი",
  "გურია",
  "აჭარა",
  "კახეთი",
  "რაჭა-ლეჩხუმი",
  "შიდა ქართლი",
  "იმერეთი",
  "აფხაზეთი",
  "მცხეთა-მთიანეთი",
  "სამეგრელო",
  "სამცხე-ჯავახეთი",
  "თბილისი",
];

function RegionFilter({ toggleDropdown }) {
  const { regions: selectedRegions, changeRegions } = useFilterContext();
  const [localRegions, setLocalRegions] = useState(selectedRegions);

  const handleCheckboxChange = (region) => {
    const updatedRegions = localRegions.includes(region)
      ? localRegions.filter((r) => r !== region)
      : [...localRegions, region];
    setLocalRegions(updatedRegions);
  };

  const handleApplySelection = () => {
    changeRegions(localRegions);
    toggleDropdown();
  };

  const handleKeyDown = (event, region) => {
    if (event.key === "Enter") {
      handleCheckboxChange(region);
    }
  };

  return (
    <>
      <div className="absolute left-[-6px] bottom-[-300px] w-[731px] h-[284px] border rounded-[10px] bg-white">
        <div className="flex flex-col gap-6 mt-6 ml-6 text-customBlue">
          <div>
            <p>რეგიონის მიხედვით</p>
          </div>
          <div className="grid grid-cols-3 gap-y-4 gap-x-[50px] text-sm/[16.8px]">
            {regions.map((region, i) => (
              <div
                key={i + region}
                className="flex items-center gap-2"
                onKeyDown={(event) => handleKeyDown(event, region)}
              >
                <input
                  type="checkbox"
                  id={region}
                  className="w-5 h-5 text-gray-300 border-gray-300 rounded focus:ring-gray-300 checked:accent-[#45A849]"
                  checked={localRegions.includes(region)}
                  onChange={() => handleCheckboxChange(region)}
                />
                <label htmlFor={region}>{region}</label>
              </div>
            ))}
          </div>
          <div className="relative w-full"></div>
        </div>

        <div className="mt-[34px] mr-6">
          <button
            onClick={handleApplySelection}
            className={`absolute right-4 bottom-4 rounded-[10px] text-sm/[16.8px] px-[14px] py-2 text-white bg-[#F93B1D] cursor-pointer font-semibold hover:bg-[#DF3014] transition-all duration-150`}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
}

export default RegionFilter;
