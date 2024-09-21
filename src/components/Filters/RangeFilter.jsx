import React, { useState, useEffect } from "react";
import { useFilterContext } from "../../contexts/FilterContext";

const maxValue = 99999999999;

function RangeFilter({ toggleDropdown, title, unit }) {
  const presetValues = ["50", "100", "150", "200", "300"];
  const { price, changePrice, area, changeArea } = useFilterContext();
  const [localMin, setLocalMin] = useState(
    unit === "gel" ? price.min : area.min
  );
  const [localMax, setLocalMax] = useState(
    unit === "gel" ? price.max : area.max
  );
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    validateValues();
  }, [localMin, localMax]);

  useEffect(() => {
    // Update local state when context changes
    setLocalMin(unit === "gel" ? price.min : area.min);
    setLocalMax(unit === "gel" ? price.max : area.max);
  }, [price, area, unit]);

  function validateValues() {
    if (localMin && localMax && Number(localMin) > Number(localMax)) {
      setError("მინიმალური მნიშვნელობა არ უნდა აღემატებოდეს მაქსიმალურს");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }

  function handleMinimumChange(event) {
    setLocalMin(event.target.value);
  }

  function handleMaximumChange(event) {
    setLocalMax(event.target.value);
  }

  function handlePresetChange(isMin, value) {
    const numericValue = unit === "gel" ? value + "000" : value;
    if (isMin) {
      setLocalMin(numericValue);
    } else {
      setLocalMax(numericValue);
    }
  }

  function handleSelectClick() {
    if (!isValid) {
      return;
    }

    const changeFunction = unit === "gel" ? changePrice : changeArea;
    const max = localMax === 0 ? maxValue : localMax;

    changeFunction({ min: localMin, max });
    toggleDropdown();
  }

  const getDisplayValue = (value) => {
    return unit === "gel" ? `${value},000 ₾` : `${value} მ²`;
  };

  return (
    <>
      <div className="absolute left-[-6px] bottom-[-388px] w-[382px] h-[372px] border rounded-[10px] bg-white">
        <div className="flex flex-col justify-between gap-6 mt-6 ml-6">
          <div>
            <p>{title}</p>
          </div>
          <div className="flex flex-row gap-[15px] justify-start">
            <div className="w-[155px] h-[42px] border rounded-[6px] relative">
              <input
                type="number"
                placeholder="დან"
                value={localMin}
                onChange={handleMinimumChange}
                className="h-full w-full appearance-none py-[12.5px] pl-2 pr-[18px]"
              />
              <div className="absolute right-[10px] top-[12.5px] font-firaGo font-normal text-xs/[14.4px]">
                {unit === "gel" ? <p>₾</p> : <p>მ²</p>}
              </div>
            </div>
            <div className="w-[155px] h-[42px] border rounded-[6px] relative">
              <input
                type="number"
                placeholder="მდე"
                value={localMax}
                onChange={handleMaximumChange}
                className="h-full w-full appearance-none py-[12.5px] pl-2 pr-[18px]"
              />
              <div className="absolute right-[10px] top-[12.5px] font-firaGo font-normal text-xs/[14.4px]">
                {unit === "gel" ? <p>₾</p> : <p>მ²</p>}
              </div>
            </div>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-row justify-between text-sm/[16.8px]">
            <div className="flex flex-col w-[155px] justify-between">
              <div className="font-medium font-firaGo">
                <p>მინ. {unit === "gel" ? "ფასი" : "ფართი"}</p>
              </div>
              <div className="flex flex-col gap-2 mt-4 font-normal font-firaGo text-customGray">
                {presetValues.map((value) => (
                  <div
                    key={value}
                    onClick={() => handlePresetChange(true, value)}
                    className="cursor-pointer"
                  >
                    {getDisplayValue(value)}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-[155px] mr-6 justify-between">
              <div className="">
                <p>მაქს. {unit === "gel" ? "ფასი" : "ფართი"}</p>
              </div>
              <div className="flex flex-col gap-2 mt-4 font-normal font-firaGo text-customGray">
                {presetValues.map((value) => (
                  <div
                    key={value}
                    onClick={() => handlePresetChange(false, value)}
                    className="cursor-pointer"
                  >
                    {getDisplayValue(value)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[34px] mr-6">
          <button
            onClick={handleSelectClick}
            disabled={!isValid}
            className={`absolute right-4 bottom-4 rounded-[10px] text-sm/[16.8px] px-[14px] py-2 text-white font-semibold transition-all duration-150 ${
              isValid
                ? "bg-[#F93B1D] cursor-pointer hover:bg-[#DF3014]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
}

export default RangeFilter;
