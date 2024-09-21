import { useState } from "react";
import { useFilterContext } from "../../contexts/FilterContext";

function RoomNumberFilter({ toggleDropdown }) {
  const { bedroomNumber, changeBedroomNumber } = useFilterContext();
  const [currRoomNumber, setRoomNumber] = useState(bedroomNumber);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handleApplySelection() {
    changeBedroomNumber(currRoomNumber);
    toggleDropdown();
  }

  return (
    <>
      <div className="absolute left-[-6px] bottom-[-214px] w-[282px] h-[198px] border rounded-[10px] bg-white">
        <div className="flex flex-col justify-between gap-6 mt-6 ml-6 text-customBlue">
          <div>
            <p>საძინებლების რაოდენობა</p>
          </div>
          <div className="w-[60px] h-[42px] border rounded-[6px] relative">
            <input
              type="number"
              placeholder="2"
              value={currRoomNumber}
              onChange={handleRoomNumberChange}
              className="h-full w-full appearance-none py-[12.5px] px-[10px] text-center"
            />
          </div>
        </div>

        <div className="mt-[34px] mr-6">
          <button
            onClick={handleApplySelection}
            className="absolute right-4 bottom-4 rounded-[10px] text-sm/[16.8px] px-[14px] py-2 text-white bg-[#F93B1D] cursor-pointer font-semibold hover:bg-[#DF3014] transition-all duration-150"
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
}

export default RoomNumberFilter;
