import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import apiKey from "../assets/apiKey";
import ImageUpload from "./ImageUpload";
import CustomButton from "./CustomButton";
import Modal from "./ModalAgent";

function AddListingForm() {
  const navigate = useNavigate();

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(undefined);
  const [modalShowed, setModalShowed] = useState(false);
  const [agentsTrigger, setAgentsTrigger] = useState(false);
  // const [formData, setFormData] = useState({
  //   type: "",
  //   location: {
  //     address: "",
  //     postalCode: "",
  //     region: "",
  //     region_id: "",
  //     city: "",
  //     city_id: "",
  //   },
  //   price: "",
  //   area: "",
  //   roomNumber: "",
  //   description: "",
  //   image: null,
  //   agent: {
  //     id: "",
  //     name: "",
  //     surname: "",
  //     avatar: "",
  //   },
  // });

  if (modalShowed) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const getInitialFormData = () => {
    const savedFormData = window.localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          type: "",
          location: {
            address: "",
            postalCode: "",
            region: "",
            region_id: "",
            city: "",
            city_id: "",
          },
          price: "",
          area: "",
          roomNumber: "",
          description: "",
          image: null,
          agent: {
            id: "",
            name: "",
            surname: "",
            avatar: "",
          },
        };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    window.localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const clearListingLocalStorage = () => {
    window.localStorage.removeItem("formData");
  };

  useEffect(() => {
    function closeModal(e) {
      if (e.key === "Escape") {
        setModalShowed(false);
      }
    }

    const esqClose = window.addEventListener("keydown", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/agents",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Failed to fetch regions:", error);
      }
    };

    fetchAgents();
  }, [agentsTrigger]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error("Failed to fetch regions:", error);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/cities",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch regions:", error);
      }
    };

    fetchCities();
  }, []);

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

  const handleFormSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("address", formData.location.address);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("region_id", formData.location.region_id);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("city_id", formData.location.city_id);
      formDataToSend.append("zip_code", formData.location.postalCode);
      formDataToSend.append("price", +formData.price);
      formDataToSend.append("area", formData.area);
      formDataToSend.append("bedrooms", +formData.roomNumber);
      formDataToSend.append("is_rental", formData.type === "ქირავდება" ? 1 : 0);
      formDataToSend.append("agent_id", formData.agent.id);

      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + apiKey, // No need to set Content-Type; it will be automatically set for FormData
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const result = await response.json();
      // console.log("Success:", result);
    } catch (error) {
      // console.error("Failed to submit form:", error);
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    handleFormSubmit(formData);
  };

  const handleShowModalToggle = (showed) => {
    setModalShowed(showed);
  };

  const handleFormDataChange = (key, val, key2) => {
    key2 === undefined
      ? setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [key]: val,
          };
        })
      : setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [key]: {
              ...prevFormData[key],
              [key2]: val,
            },
          };
        });
  };

  const handleDropdownClick = (e) => {
    setActiveDropdown((prev) => {
      return prev === e.target.id ? undefined : e.target.id;
    });
  };

  const checkPostalCode = () => {
    return /^[0-9]+$/.test(formData.location.postalCode);
  };

  const checkOnlyNumbers = (val) => {
    return /^[0-9]+$/.test(val);
  };

  const containsFiveWords = (str) => {
    const words = str.trim().split(/\s+/);
    return words.length >= 5;
  };

  const changeAgentsTrigger = () => {
    setAgentsTrigger((prevTrigger) => !prevTrigger);
  };

  const clearListingLocalStorageSubmit = (e) => {
    handleSubmit();
    window.localStorage.removeItem("formData");
  };

  const checkAll = () => {
    return (
      formData.type !== "" &&
      formData.location.address.length > 2 &&
      checkPostalCode &&
      formData.location.region_id !== "" &&
      formData.location.city_id !== "" &&
      formData.image !== undefined &&
      containsFiveWords(formData.description) &&
      checkOnlyNumbers(formData.price) &&
      checkOnlyNumbers(formData.area) &&
      checkOnlyNumbers(formData.roomNumber) &&
      checkOnlyNumbers(formData.agent.id)
    );
  };

  const handleClick = (e) => {
    if (checkAll()) {
      console.log("all correct");
      clearListingLocalStorageSubmit(e);
      navigate("/");
    } else {
      e.preventDefault();
    }
  };

  // console.log(formData);
  // console.log(regions);
  // console.log(cities);
  // console.log(activeDropdown + ": activeDropdown");
  //console.log(agents);

  //   console.log("----------------------------------");
  //   console.log(formData.location.address);
  //   console.log(formData.image);
  //   console.log(formData.location.region_id);
  //   console.log(formData.description);
  //   console.log(formData.location.city_id);
  //   console.log(formData.location.postalCode);
  //   console.log(formData.price);
  //   console.log(formData.area);
  //   console.log(formData.roomNumber);
  //   console.log(formData.agent.id);
  //   console.log(formData.type === "ქირავდება" ? 1 : 0);

  return (
    <div>
      <div className="font-firaGo font-medium text-[32px]/[38.4px] text-customBlue mt-[62px] flex flex-row justify-center">
        <p>ლისტინგის დამატება</p>
      </div>
      <div className="w-[790px] h-[1211px] absolute top-[261px] left-[566px] font-helveticaNeue">
        <div className="w-[266px] h-[45px]">
          <p className="text-base/[19.54px] text-customBlack">გარიგების ტიპი</p>
          <div className="flex gap-[84px] text-sm/[16.8px] text-customBlue mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="იყიდება"
                checked={formData.type === "იყიდება"}
                onChange={() => handleFormDataChange("type", "იყიდება")}
                className="mr-[7px]"
              />
              <span>იყიდება</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="ქირავდება"
                checked={formData.type === "ქირავდება"}
                onChange={() => handleFormDataChange("type", "ქირავდება")}
                className="mr-[7px]"
              />
              <span>ქირავდება</span>
            </label>
          </div>
        </div>
        <div className="w-[790px] h-[232px] mt-[80px]">
          <div className="font-helveticaNeue font-medium text-base/[19.54px] text-customBlack">
            <p>მდებარეობა</p>
          </div>

          <div className="w-[790px] h-[190px] mt-[22px] font-firaGo font-medium text-sm/[16.8px] flex flex-row flex-wrap gap-[20px]">
            <div className="flex flex-col">
              <div>
                <p>მისამართი *</p>
              </div>
              <div className="w-[384px] h-[42px] mt-[5px]">
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) =>
                    handleFormDataChange("location", e.target.value, "address")
                  }
                  className="h-full w-full appearance-none rounded-md border border-customGrayAlt py-[12.5px] pl-2 pr-[18px]"
                ></input>
              </div>
              <div
                className={`font-normal flex flex-row gap-[7px] ${
                  formData.location.address === ""
                    ? "text-customBlue"
                    : formData.location.address.trim().length < 2
                    ? "text-customRed"
                    : "text-customGreen"
                } items-center mt-1`}
              >
                <svg
                  className="w-[10px] h-[8.18px] stroke-current"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {formData.location.address !== "" &&
                  formData.location.address.length < 2
                    ? "ჩაწერეთ ვალიდური მონაცემები"
                    : "მინიმუმ ორი სიმბოლო"}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <p>საფოსტო ინდექსი *</p>
              </div>
              <div className="w-[384px] h-[42px] rounded-md mt-[5px]">
                <input
                  type="text"
                  value={formData.location.postalCode}
                  onChange={(e) =>
                    handleFormDataChange(
                      "location",
                      e.target.value,
                      "postalCode"
                    )
                  }
                  className="h-full w-full appearance-none rounded-md border border-customGrayAlt py-[12.5px] pl-2 pr-[18px]"
                ></input>
              </div>
              <div
                className={`font-normal flex flex-row gap-[7px] ${
                  formData.location.postalCode === ""
                    ? "text-customBlue"
                    : checkPostalCode()
                    ? "text-customGreen"
                    : "text-customRed"
                } items-center mt-1`}
              >
                <svg
                  className="w-[10px] h-[8.18px] stroke-current"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {!checkPostalCode() && formData.location.postalCode !== ""
                    ? "ჩაწერეთ ვალიდური მონაცემები"
                    : "მხოლოდ რიცხვები"}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <p>რეგიონი *</p>
              </div>
              <div
                id="რეგიონი"
                className={`w-[384px] h-[42px] flex flex-row justify-between items-center ${
                  activeDropdown === "რეგიონი"
                    ? "rounded-tl-md rounded-tr-md"
                    : "rounded-md"
                } border border-customGrayAlt mt-[5px] dropdown cursor-pointer text-sm/[16.8px] font-normal text-customBlue px-[10px] py-[12.5px] relative`}
                onClick={handleDropdownClick}
              >
                <div>
                  <p>
                    {formData.location.region === ""
                      ? "აირჩიე"
                      : formData.location.region}
                  </p>
                </div>
                <div>
                  {activeDropdown === "რეგიონი" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-[14px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-[14px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </div>
                {activeDropdown === "რეგიონი" ? (
                  <div className="left-[-1px] bottom-0 translate-y-full  rounded-bl-md rounded-br-md flex flex-col absolute">
                    {regions.map((regionJSON) => {
                      return (
                        <div
                          key={regionJSON.id}
                          onClick={() => {
                            handleFormDataChange(
                              "location",
                              regionJSON.name,
                              "region"
                            );
                            handleFormDataChange(
                              "location",
                              regionJSON.id,
                              "region_id"
                            );
                            handleFormDataChange("location", "", "city");
                          }}
                          className={`w-[384px] border border-customGrayAlt bg-white ${
                            regionJSON.id === regions.length
                              ? "rounded-bl-md rounded-br-md"
                              : ""
                          } px-[10px] py-[12.5px]`}
                        >
                          <p>{regionJSON.name}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            {formData.location.region !== "" ? (
              <div className="flex flex-col">
                <div>
                  <p>ქალაქი *</p>
                </div>
                <div
                  id="ქალაქი"
                  className={`w-[384px] h-[42px] flex flex-row justify-between items-center ${
                    activeDropdown === "ქალაქი"
                      ? "rounded-tl-md rounded-tr-md"
                      : "rounded-md"
                  } border border-customGrayAlt mt-[5px] dropdown cursor-pointer text-sm/[16.8px] font-normal text-customBlue px-[10px] py-[12.5px] relative`}
                  onClick={handleDropdownClick}
                >
                  <div>
                    <p>{formData.location.city}</p>
                  </div>
                  <div>
                    {activeDropdown === "ქალაქი" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-[14px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-[14px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    )}
                  </div>
                  {activeDropdown === "ქალაქი" && (
                    <div className="left-[-1px] bottom-0 translate-y-full flex flex-col absolute">
                      {cities
                        .filter(
                          (cityJSON) =>
                            regions[cityJSON.region_id - 1].name ===
                            formData.location.region
                        )
                        .map((cityJSON, index, filteredCities) => {
                          const isLast = index === filteredCities.length - 1;
                          return (
                            <div
                              key={cityJSON.id}
                              onClick={() => {
                                handleFormDataChange(
                                  "location",
                                  cityJSON.name,
                                  "city"
                                );
                                handleFormDataChange(
                                  "location",
                                  cityJSON.id,
                                  "city_id"
                                );
                              }}
                              className={`w-[384px] border border-customGrayAlt bg-white px-[10px] py-[12.5px] ${
                                isLast ? "rounded-bl-md rounded-br-md" : ""
                              }`}
                            >
                              <p>{cityJSON.name}</p>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-[790px] h-[232px] mt-[80px]">
          <div className="font-helveticaNeue font-medium text-base/[19.54px] text-customBlack">
            <p>ბინის დეტალები</p>
          </div>

          <div className="w-[790px] h-[190px] mt-[22px] font-firaGo font-medium text-sm/[16.8px] flex flex-row flex-wrap gap-[20px]">
            <div className="flex flex-col">
              <div>
                <p>ფასი *</p>
              </div>

              <div className="w-[384px] h-[42px] rounded-md mt-[5px]">
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    handleFormDataChange("price", e.target.value)
                  }
                  className="h-full w-full appearance-none rounded-md border border-customGrayAlt py-[12.5px] pl-2 pr-[18px]"
                ></input>
              </div>
              <div
                className={`font-normal flex flex-row gap-[7px] ${
                  formData.price === ""
                    ? "text-customBlue"
                    : checkOnlyNumbers(formData.price)
                    ? "text-customGreen"
                    : "text-customRed"
                } items-center mt-1`}
              >
                <svg
                  className="w-[10px] h-[8.18px] stroke-current"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {!checkOnlyNumbers(formData.price) && formData.price !== ""
                    ? "ჩაწერეთ ვალიდური მონაცემები"
                    : "მხოლოდ რიცხვები"}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <p>ფართობი *</p>
              </div>

              <div className="w-[384px] h-[42px] rounded-md mt-[5px]">
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => handleFormDataChange("area", e.target.value)}
                  className="h-full w-full appearance-none rounded-md border border-customGrayAlt py-[12.5px] pl-2 pr-[18px]"
                ></input>
              </div>
              <div
                className={`font-normal flex flex-row gap-[7px] ${
                  formData.area === ""
                    ? "text-customBlue"
                    : checkOnlyNumbers(formData.area)
                    ? "text-customGreen"
                    : "text-customRed"
                } items-center mt-1`}
              >
                <svg
                  className="w-[10px] h-[8.18px] stroke-current"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {!checkOnlyNumbers(formData.area) && formData.area !== ""
                    ? "ჩაწერეთ ვალიდური მონაცემები"
                    : "მხოლოდ რიცხვები"}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <p>საძინებლების რაოდენობა *</p>
              </div>

              <div className="w-[384px] h-[42px] rounded-md mt-[5px]">
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    handleFormDataChange("roomNumber", e.target.value)
                  }
                  className="h-full w-full appearance-none rounded-md border border-customGrayAlt py-[12.5px] pl-2 pr-[18px]"
                ></input>
              </div>
              <div
                className={`font-normal flex flex-row gap-[7px] ${
                  formData.roomNumber === ""
                    ? "text-customBlue"
                    : checkOnlyNumbers(formData.roomNumber)
                    ? "text-customGreen"
                    : "text-customRed"
                } items-center mt-1`}
              >
                <svg
                  className="w-[10px] h-[8.18px] stroke-current"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {!checkOnlyNumbers(formData.roomNumber) &&
                  formData.roomNumber !== ""
                    ? "ჩაწერეთ ვალიდური მონაცემები"
                    : "მხოლოდ რიცხვები"}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <p>აღწერა *</p>
              </div>

              <div className="w-[788px] h-[135px] rounded-md mt-[5px]">
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleFormDataChange("description", e.target.value)
                  }
                  className="h-full w-full appearance-none rounded-md border border-customGrayAlt py-[12.5px] pl-2 pr-[18px] resize-none"
                  rows="4"
                ></textarea>
              </div>
              <div
                className={`font-normal flex flex-row gap-[7px] ${
                  formData.description === ""
                    ? "text-customBlue"
                    : containsFiveWords(formData.description)
                    ? "text-customGreen"
                    : "text-customRed"
                } items-center mt-1`}
              >
                <svg
                  className="w-[10px] h-[8.18px] stroke-current"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {!containsFiveWords(formData.description) &&
                  formData.description !== ""
                    ? "ჩაწერეთ ვალიდური მონაცემები"
                    : "მინიმუმ ხუთი სიტყვა"}
                </p>
              </div>
            </div>

            <ImageUpload
              setImage={(file) => handleFormDataChange("image", file)}
            />

            <div className="w-[790px] h-[99px] mt-[80px] z-20">
              <div className="font-helveticaNeue font-medium text-base/[19.54px] text-customBlack">
                <p>აგენტი</p>
              </div>
              <div className="w-[790px] mt-[22px] font-firaGo font-medium text-sm/[16.8px] flex flex-row flex-wrap gap-[20px]">
                <div className="flex flex-col">
                  <p>აირჩიე *</p>
                  <div
                    id="აგენტი"
                    className={`w-[384px] h-[42px] flex flex-row justify-between items-center ${
                      activeDropdown === "აგენტი"
                        ? "rounded-tl-md rounded-tr-md"
                        : "rounded-md"
                    } border border-customGrayAlt mt-[5px] dropdown cursor-pointer text-sm/[16.8px] font-normal text-customBlue px-[10px] py-[12.5px] relative`}
                    onClick={handleDropdownClick}
                  >
                    <div>
                      <p>
                        {formData.agent.id === ""
                          ? ""
                          : formData.agent.name + " " + formData.agent.surname}
                      </p>
                    </div>
                    <div>
                      {activeDropdown === "აგენტი" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-[14px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-[14px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      )}
                    </div>
                    {activeDropdown === "აგენტი" ? (
                      <div className="left-[-1px] bottom-0 translate-y-full  rounded-bl-md rounded-br-md flex flex-col absolute">
                        <div
                          key="activateModal"
                          onClick={() => handleShowModalToggle(true)}
                          className={`flex flex-row gap-2 items-center z-50 w-[384px] border border-customGrayAlt bg-white ${
                            agents.length === 0
                              ? "rounded-bl-md rounded-br-md"
                              : ""
                          } px-[10px] py-[12.5px]`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#2D3648"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#2D3648"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#2D3648"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>დაამატე აგენტი</p>
                        </div>
                        {agents.map((agentJSON, index) => {
                          const isLast = index === agents.length - 1;
                          return (
                            <div
                              key={agentJSON.id}
                              onClick={() => {
                                handleFormDataChange("agent", agentJSON);
                              }}
                              className={`w-[384px] border border-customGrayAlt bg-white ${
                                isLast ? "rounded-bl-md rounded-br-md" : ""
                              } px-[10px] py-[12.5px]`}
                            >
                              <p>{agentJSON.name + " " + agentJSON.surname}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                    {modalShowed && (
                      <Modal
                        onClose={() => setModalShowed(false)}
                        onSubmit={() => {
                          setModalShowed(false);
                          changeAgentsTrigger();
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[47px] w-[790px] absolute left-[566px] top-[1562px] flex flex-row justify-between">
        <div></div>
        <div className="flex flex-row gap-[15px]">
          <Link to="/" onClick={clearListingLocalStorage}>
            <CustomButton isPrimary="false" width="103px" height="47px">
              გაუქმება
            </CustomButton>
          </Link>
          <CustomButton
            isPrimary="true"
            width="187px"
            height="47px"
            onSubmit={handleClick}
          >
            დაამატე ლისტინგი
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default AddListingForm;
