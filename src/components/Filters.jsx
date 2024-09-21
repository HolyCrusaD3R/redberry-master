import { useState, useEffect } from "react";

import Filter from "./Filters/Filter";
import RegionFilter from "./Filters/RegionFilter";
import RangeFilter from "./Filters/RangeFilter";
import AreaFilter from "./Filters/AreaFilter";
import RoomNumberFilter from "./Filters/RoomNumberFilter";

function Filters() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id) => {
    console.log(id);
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-row  gap-[24px] border p-[6px] rounded-[10px] z-20">
      <Filter
        id="regionFilter"
        content="რეგიონი"
        isOpen={activeDropdown === "regionFilter"}
        onToggle={() => toggleDropdown("regionFilter")}
      >
        <RegionFilter toggleDropdown={toggleDropdown} />
      </Filter>
      <Filter
        id="priceFilter"
        content="საფასო კატეგორია"
        isOpen={activeDropdown === "priceFilter"}
        onToggle={() => toggleDropdown("priceFilter")}
      >
        <RangeFilter
          title={"ფასის მიხედვით"}
          unit="gel"
          toggleDropdown={toggleDropdown}
        />
      </Filter>
      <Filter
        id="areaFilter"
        content="ფართობი"
        isOpen={activeDropdown === "areaFilter"}
        onToggle={() => toggleDropdown("areaFilter")}
      >
        <RangeFilter
          title={"ფართობის მიხედვით"}
          unit="area"
          toggleDropdown={toggleDropdown}
        />
      </Filter>
      <Filter
        id="roomNumberFilter"
        content="საძინებლების რაოდენობა"
        isOpen={activeDropdown === "roomNumberFilter"}
        onToggle={() => toggleDropdown("roomNumberFilter")}
      >
        <RoomNumberFilter toggleDropdown={toggleDropdown} />
      </Filter>
    </div>
  );
}

export default Filters;
