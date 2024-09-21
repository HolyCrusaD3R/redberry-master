// import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

import apiKey from "../assets/apiKey";

export default function ModalAgent({ onClose, onSubmit }) {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   surname: "",
  //   email: "",
  //   phoneNumber: "",
  //   avatar: null,
  // });

  const getInitialFormData = () => {
    const savedFormData = window.localStorage.getItem("formDataAgent");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          avatar: null,
        };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    window.localStorage.setItem("formDataAgent", JSON.stringify(formData));
  }, [formData]);

  const safeTrim = (value) =>
    typeof value === "string" ? value.trim() : value;

  const safeLength = (value) => (typeof value === "string" ? value.length : 0);

  const clearAgentFormData = () => {
    // console.log("test");
    window.localStorage.removeItem("formDataAgent");
    onClose();
  };

  const handleFormDataChange = (key, val) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [key]: val,
      };
    });
  };

  const checkRedberryEmail = (email) => {
    const regex = /@redberry\.ge$/;
    return regex.test(email);
  };

  const checkPhoneNumber = (number) => {
    const regex = /^5\d{8}$/;
    return regex.test(number);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("surname", formData.surname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phoneNumber);
      formDataToSend.append("avatar", formData.avatar);

      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
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

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleFormSubmit(formData);
    onSubmit();
  };

  // console.log(formData);

  return (
    <>
      <div className="fixed w-[1009px] h-[784px] items-center -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 rounded-xl shadow-[5px5px_12px_0px#02152614] py-12 px-[105px] flex flex-col gap-8 z-[9999]">
        <p className="text-[#2D3648] font-firaGo font-medium text-[32px]/[38.4px]">
          აგენტის დამატება
        </p>
        <div className="font-firaGo font-medium text-sm/[16.8px] flex flex-row flex-wrap gap-x-[31px] gap-y-[28px] mt-[61px]">
          <div className="flex flex-col">
            <div>
              <p>სახელი *</p>
            </div>
            <div className="w-[384px] h-[42px] mt-[5px]">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFormDataChange("name", e.target.value)}
                className={`h-full w-full appearance-none rounded-md border ${
                  safeLength(safeTrim(formData.name)) < 2 &&
                  formData.name !== ""
                    ? "border-customRed  outline-customRed"
                    : "border-customGrayAlt"
                } py-[12.5px] pl-2 pr-[18px]`}
              ></input>
            </div>
            <div
              className={`font-normal flex flex-row gap-[7px] ${
                formData.name === ""
                  ? "text-customBlue"
                  : safeLength(safeTrim(formData.name)) < 2
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
                {formData.name !== "" && safeLength(safeTrim(formData.name)) < 2
                  ? "ჩაწერეთ ვალიდური მონაცემები"
                  : "მინიმუმ ორი სიმბოლო"}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p>გვარი *</p>
            </div>
            <div className="w-[384px] h-[42px] mt-[5px]">
              <input
                type="text"
                value={formData.surname}
                onChange={(e) =>
                  handleFormDataChange("surname", e.target.value)
                }
                className={`h-full w-full appearance-none rounded-md border ${
                  safeLength(safeTrim(formData.surname)) < 2 &&
                  formData.surname !== ""
                    ? "border-customRed  outline-customRed"
                    : "border-customGrayAlt"
                } py-[12.5px] pl-2 pr-[18px]`}
              ></input>
            </div>
            <div
              className={`font-normal flex flex-row gap-[7px] ${
                formData.surname === ""
                  ? "text-customBlue"
                  : safeLength(safeTrim(formData.surname)) < 2
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
                {formData.surname !== "" &&
                safeLength(safeTrim(formData.surname)) < 2
                  ? "ჩაწერეთ ვალიდური მონაცემები"
                  : "მინიმუმ ორი სიმბოლო"}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p>ელ-ფოსტა *</p>
            </div>
            <div className="w-[384px] h-[42px] mt-[5px]">
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleFormDataChange("email", e.target.value)}
                className={`h-full w-full appearance-none rounded-md border ${
                  !checkRedberryEmail(formData.email) && formData.email !== ""
                    ? "border-customRed  outline-customRed"
                    : "border-customGrayAlt"
                } py-[12.5px] pl-2 pr-[18px]`}
              ></input>
            </div>
            <div
              className={`font-normal flex flex-row gap-[7px] ${
                formData.email === ""
                  ? "text-customBlue"
                  : !checkRedberryEmail(formData.email)
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
                {formData.email !== "" && !checkRedberryEmail(formData.email)
                  ? "ჩაწერეთ ვალიდური მონაცემები"
                  : "გამოიყენეთ @redberry.ge ფოსტა"}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p>ტელეფონის ნომერი *</p>
            </div>
            <div className="w-[384px] h-[42px] mt-[5px]">
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleFormDataChange("phoneNumber", e.target.value)
                }
                className={`h-full w-full appearance-none rounded-md border ${
                  !checkPhoneNumber(formData.phoneNumber) &&
                  formData.phoneNumber !== ""
                    ? "border-customRed  outline-customRed"
                    : "border-customGrayAlt"
                } py-[12.5px] pl-2 pr-[18px]`}
              ></input>
            </div>
            <div
              className={`font-normal flex flex-row gap-[7px] ${
                formData.phoneNumber === ""
                  ? "text-customBlue"
                  : !checkPhoneNumber(formData.phoneNumber)
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
                {formData.phoneNumber !== "" &&
                !checkPhoneNumber(safeTrim(formData.phoneNumber))
                  ? "ჩაწერეთ ვალიდური მონაცემები"
                  : "მხოლოდ რიცხვები"}
              </p>
            </div>
          </div>
        </div>
        <ImageUpload
          setImage={(file) => handleFormDataChange("avatar", file)}
        />
        <div className="flex flex-row items-center justify-between flex-nowrap w-full mt-[94px]">
          <div></div>
          <div className="flex flex-row items-center gap-2">
            {/* <Link to="/addlisting"> */}
            <CustomButton
              isPrimary="false"
              width="103px"
              height="47px"
              onClose={clearAgentFormData}
            >
              გაუქმება
            </CustomButton>
            {/* </Link> */}
            {/* <Link to="/addlisting"> */}
            <CustomButton
              isPrimary="true"
              width="161px"
              height="47px"
              onSubmit={(e) => {
                safeLength(safeTrim(formData.name)) > 2 &&
                safeLength(safeTrim(formData.surname)) > 2 &&
                checkRedberryEmail(formData.email) &&
                checkPhoneNumber(formData.phoneNumber) &&
                formData.avatar !== undefined
                  ? handleSubmit(e)
                  : null;
              }}
            >
              დაამატე აგენტი
            </CustomButton>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div
        onClick={clearAgentFormData}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
      ></div>
    </>
  );
}
