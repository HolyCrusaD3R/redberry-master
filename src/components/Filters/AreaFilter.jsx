import { useState } from "react";

function AreaFilter() {
  const presetAreas = ["50,000", "100,000", "150,000", "200,000", "300,000"];

  const [minimumArea, setMinimumArea] = useState(undefined);
  const [maximumArea, setMaximumArea] = useState(undefined);

  const meterPerSquareBig = (
    <div className="font-firaGo font-medium text-base/[19.2px] flex flex-row text-customBlueLight">
      <p>მ</p>
      <div className="font-firaGo font-medium text-[10px]/[12px] pb-[7px]">
        2{" "}
      </div>
    </div>
  );
  const meterPerSquareSmall = (
    <div className="font-firaGo font-medium text-[14px]/[16.8px] flex flex-row text-customBlue">
      <p>მ</p>
      <div className="font-firaGo font-medium text-[10px]/[12px] pb-[7px]">
        2{" "}
      </div>
    </div>
  );

  function handleMinimumAreaChange(event) {
    setMinimumArea(event.target.value);
  }

  function handleMaximumAreaChange(event) {
    setMaximumArea(event.target.value);
  }

  function handlePresetAreaChange(setAreaFunction, area) {
    const numericArea = area.replace(/,/g, "");
    setAreaFunction(numericArea);
  }

  return (
    <>
      <div className="absolute left-[-6px] bottom-[-388px] w-[382px] h-[372px] border rounded-[10px] bg-white">
        <div className="flex flex-col justify-between gap-6 mt-6 ml-6">
          <div>
            <p>ფართობის მიხედვით</p>
          </div>
          <div className="flex flex-row gap-[15px] justify-start">
            <div className="w-[155px] h-[42px] border rounded-[6px] relative">
              <input
                type="number"
                placeholder="დან"
                value={minimumArea}
                onChange={handleMinimumAreaChange}
                className="h-full w-full appearance-none py-[12.5px] pl-2 pr-[18px]"
              ></input>
              <div className="absolute right-[10px] top-[12.5px] font-firaGo font-normal text-xs/[14.4px]">
                {meterPerSquareBig}
              </div>
            </div>
            <div className="w-[155px] h-[42px] border rounded-[6px] relative">
              <input
                type="number"
                placeholder="მდე"
                value={maximumArea}
                onChange={handleMaximumAreaChange}
                className="h-full w-full appearance-none py-[12.5px] pl-2 pr-[18px]"
              ></input>
              <div className="absolute right-[10px] top-[12.5px] font-firaGo font-normal text-xs/[14.4px]">
                {meterPerSquareBig}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between text-sm/[16.8px]">
            <div className="flex flex-col w-[155px] justify-between">
              <div className="flex flex-row gap-2 font-medium font-firaGo">
                <p>მინ.</p>
                {meterPerSquareSmall}
              </div>
              <div className="flex flex-col gap-2 mt-4 font-normal font-firaGo text-customGray">
                {presetAreas.map((area) => {
                  return (
                    <div
                      key={area}
                      onClick={() =>
                        handlePresetAreaChange(setMinimumArea, area)
                      }
                      className="flex flex-row items-center gap-1 cursor-pointer"
                    >
                      <>{area}</>
                      {meterPerSquareBig}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-[155px] mr-6 justify-between">
              <div className="flex flex-row gap-2 font-medium font-firaGo">
                <p>მაქს.</p>
                {meterPerSquareSmall}
              </div>
              <div className="flex flex-col gap-2 mt-4 font-normal font-firaGo text-customGray">
                {presetAreas.map((area) => {
                  return (
                    <div
                      key={area}
                      onClick={() =>
                        handlePresetAreaChange(setMaximumArea, area)
                      }
                      className="flex flex-row items-center gap-1 cursor-pointer"
                    >
                      <>{area}</>
                      {meterPerSquareBig}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[34px] mr-6 relative">
          <div className="absolute right-0 bg-[#F93B1D] rounded-[10px] text-sm/[16.8px] px-[14px] py-2 text-white">
            <p>არჩევა</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default AreaFilter;
