import React, { useState, useEffect } from "react";
import { useFilterContext } from "../../contexts/FilterContext";

function PriceFilter({ toggleDropdown }) {
  const presetPrices = ["50,000", "100,000", "150,000", "200,000", "300,000"];
  const { price, changePrice } = useFilterContext();
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  console.log(price);

  useEffect(() => {
    validatePrices();
  }, [price.min, price.max]);

  function validatePrices() {
    if (price.min && price.max && Number(price.min) > Number(price.max)) {
      setError("მინიმალური ფასი არ უნდა აღემატებოდეს მაქსიმალურს");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }

  function handleMinimumPriceChange(event) {
    changePrice({ ...price, min: event.target.value });
  }

  function handleMaximumPriceChange(event) {
    changePrice({ ...price, max: event.target.value });
  }

  function handlePresetPriceChange(isMin, priceValue) {
    const numericPrice = priceValue.replace(/,/g, "");
    if (isMin) {
      changePrice({ ...price, min: numericPrice });
    } else {
      changePrice({ ...price, max: numericPrice });
    }
  }

  function handleSelectClick() {
    if (isValid) {
      toggleDropdown();
    }
  }

  return (
    <>
      <div className="absolute left-[-6px] bottom-[-388px] w-[382px] h-[372px] border rounded-[10px] bg-white">
        <div className="flex flex-col justify-between gap-6 mt-6 ml-6">
          <div>
            <p>ფასის მიხედვით</p>
          </div>
          <div className="flex flex-row gap-[15px] justify-start">
            <div className="w-[155px] h-[42px] border rounded-[6px] relative">
              <input
                type="number"
                placeholder="დან"
                value={price.min}
                onChange={handleMinimumPriceChange}
                className="h-full w-full appearance-none py-[12.5px] pl-2 pr-[18px]"
              />
              <div className="absolute right-[10px] top-[12.5px] font-firaGo font-normal text-xs/[14.4px]">
                <p>₾</p>
              </div>
            </div>
            <div className="w-[155px] h-[42px] border rounded-[6px] relative">
              <input
                type="number"
                placeholder="მდე"
                value={price.max}
                onChange={handleMaximumPriceChange}
                className="h-full w-full appearance-none py-[12.5px] pl-2 pr-[18px]"
              />
              <div className="absolute right-[10px] top-[12.5px] font-firaGo font-normal text-xs/[14.4px]">
                <p>₾</p>
              </div>
            </div>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-row justify-between text-sm/[16.8px]">
            <div className="flex flex-col w-[155px] justify-between">
              <div className="font-medium font-firaGo">
                <p>მინ. ფასი</p>
              </div>
              <div className="flex flex-col gap-2 mt-4 font-normal font-firaGo text-customGray">
                {presetPrices.map((priceValue) => (
                  <div
                    key={priceValue}
                    onClick={() => handlePresetPriceChange(true, priceValue)}
                    className="cursor-pointer"
                  >
                    {priceValue} ₾
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-[155px] mr-6 justify-between">
              <div className="">
                <p>მაქს. ფასი</p>
              </div>
              <div className="flex flex-col gap-2 mt-4 font-normal font-firaGo text-customGray">
                {presetPrices.map((priceValue) => (
                  <div
                    key={priceValue}
                    onClick={() => handlePresetPriceChange(false, priceValue)}
                    className="cursor-pointer"
                  >
                    {priceValue} ₾
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
            className={`absolute right-4 bottom-4 rounded-[10px] text-sm/[16.8px] px-[14px] py-2 text-white ${
              isValid
                ? "bg-[#F93B1D] cursor-pointer"
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

export default PriceFilter;
