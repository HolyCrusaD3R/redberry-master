import { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FillterProvider = ({ children }) => {
  const [regions, setRegions] = useState(() => {
    const savedRegions = localStorage.getItem("regions");
    return savedRegions ? JSON.parse(savedRegions) : [];
  });

  const [price, setPrice] = useState(() => {
    const savedPrice = localStorage.getItem("price");
    return savedPrice ? JSON.parse(savedPrice) : { min: 0, max: 0 };
  });

  const [area, setArea] = useState(() => {
    const savedArea = localStorage.getItem("area");
    return savedArea ? JSON.parse(savedArea) : { min: 0, max: 0 };
  });

  const [bedroomNumber, setBedroomNumber] = useState(() => {
    const savedBedroomNumber = localStorage.getItem("bedroomNumber");
    return savedBedroomNumber ? JSON.parse(savedBedroomNumber) : 0;
  });

  function changeRegions(regions) {
    setRegions(regions);
    localStorage.setItem("regions", JSON.stringify(regions));
  }

  function changePrice(price) {
    setPrice({
      min: price.min,
      max: price.max,
    });
    localStorage.setItem("price", JSON.stringify(price));
  }

  function changeArea(area) {
    setArea({
      min: area.min,
      max: area.max,
    });
    localStorage.setItem("area", JSON.stringify(area));
  }

  function changeBedroomNumber(bedroom) {
    setBedroomNumber(bedroom);
    localStorage.setItem("bedroomNumber", JSON.stringify(bedroom));
  }

  function resetFilters() {
    setRegions([]);
    setPrice({ min: 0, max: 0 });
    setArea({ min: 0, max: 0 });
    setBedroomNumber(0);
    localStorage.removeItem("regions");
    localStorage.removeItem("price");
    localStorage.removeItem("area");
    localStorage.removeItem("bedroomNumber");
  }

  const value = {
    regions,
    changeRegions,
    price,
    changePrice,
    area,
    changeArea,
    bedroomNumber,
    changeBedroomNumber,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
