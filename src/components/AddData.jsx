import React, { useState } from "react";
import Modal from "./ModalAgent";
import { Link } from "react-router-dom";

function AddData() {
  const [hoveredSecondary, setHoveredSecondary] = useState(false);
  const [modalShowed, setModalShowed] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = modalShowed ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalShowed]);

  const handleShowModalToggle = () => {
    setModalShowed((prev) => !prev);
  };

  const handleHoverSecondary = (hovered) => {
    setHoveredSecondary(hovered);
  };

  return (
    <div className="flex flex-row gap-4">
      <Link to="/addlisting">
        <div className="w-[230px] h-[47px] rounded-[10px] px-4 py-[14px] bg-customRed hover:bg-customRedAlt flex flex-row justify-center gap-[6.58px] items-center cursor-pointer">
          <div>
            <svg
              width="12.83"
              height="12.83"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 7.41439H7.91665V11.9977C7.91665 12.2408 7.82007 12.474 7.64816 12.6459C7.47625 12.8178 7.24309 12.9144 6.99998 12.9144C6.75686 12.9144 6.52371 12.8178 6.3518 12.6459C6.17989 12.474 6.08331 12.2408 6.08331 11.9977V7.41439H1.49998C1.25686 7.41439 1.02371 7.31781 0.851799 7.1459C0.67989 6.97399 0.583313 6.74084 0.583313 6.49772C0.583313 6.25461 0.67989 6.02145 0.851799 5.84954C1.02371 5.67763 1.25686 5.58105 1.49998 5.58105H6.08331V0.997721C6.08331 0.754606 6.17989 0.521448 6.3518 0.34954C6.52371 0.177632 6.75686 0.0810547 6.99998 0.0810547C7.24309 0.0810547 7.47625 0.177632 7.64816 0.34954C7.82007 0.521448 7.91665 0.754606 7.91665 0.997721V5.58105H12.5C12.7431 5.58105 12.9763 5.67763 13.1482 5.84954C13.3201 6.02145 13.4166 6.25461 13.4166 6.49772C13.4166 6.74084 13.3201 6.97399 13.1482 7.1459C12.9763 7.31781 12.7431 7.41439 12.5 7.41439Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="font-firaGo font-medium text-white text-base/[19.2px] whitespace-nowrap">
            <p>ლისტინგების დამატება</p>
          </div>
        </div>
      </Link>
      <div
        className="w-[203px] h-[47px] rounded-[10px] px-4 py-[14px] bg-white hover:bg-customRed border border-[#F93B1D] flex flex-row justify-center gap-[6.58px] items-center cursor-pointer"
        onMouseEnter={() => handleHoverSecondary(true)}
        onMouseLeave={() => handleHoverSecondary(false)}
        onClick={handleShowModalToggle}
      >
        <div>
          <svg
            fill={hoveredSecondary ? "white" : "#F93B1D"}
            width="12.83"
            height="12.83"
            viewBox="0 0 14 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.5 7.41439H7.91665V11.9977C7.91665 12.2408 7.82007 12.474 7.64816 12.6459C7.47625 12.8178 7.24309 12.9144 6.99998 12.9144C6.75686 12.9144 6.52371 12.8178 6.3518 12.6459C6.17989 12.474 6.08331 12.2408 6.08331 11.9977V7.41439H1.49998C1.25686 7.41439 1.02371 7.31781 0.851799 7.1459C0.67989 6.97399 0.583313 6.74084 0.583313 6.49772C0.583313 6.25461 0.67989 6.02145 0.851799 5.84954C1.02371 5.67763 1.25686 5.58105 1.49998 5.58105H6.08331V0.997721C6.08331 0.754606 6.17989 0.521448 6.3518 0.34954C6.52371 0.177632 6.75686 0.0810547 6.99998 0.0810547C7.24309 0.0810547 7.47625 0.177632 7.64816 0.34954C7.82007 0.521448 7.91665 0.754606 7.91665 0.997721V5.58105H12.5C12.7431 5.58105 12.9763 5.67763 13.1482 5.84954C13.3201 6.02145 13.4166 6.25461 13.4166 6.49772C13.4166 6.74084 13.3201 6.97399 13.1482 7.1459C12.9763 7.31781 12.7431 7.41439 12.5 7.41439Z" />
          </svg>
        </div>
        <div
          className={`font-firaGo font-medium text-base/[19.2px] whitespace-nowrap ${
            hoveredSecondary ? "text-white" : "text-customRed"
          }`}
        >
          <p>აგენტის დამატება</p>
        </div>
      </div>
      {modalShowed && (
        <Modal
          onClose={() => setModalShowed(false)}
          onSubmit={() => {
            setModalShowed(false);
          }}
        />
      )}
    </div>
  );
}

export default AddData;
