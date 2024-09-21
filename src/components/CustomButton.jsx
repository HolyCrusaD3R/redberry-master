import { useState } from "react";

function CustomButton({
  children,
  isPrimary,
  width,
  height,
  onSubmit,
  onClose,
}) {
  const [hovered, setHover] = useState(false);

  const handleHover = (hovered) => {
    setHover(hovered);
  };

  const borderColor =
    isPrimary === "true" && hovered
      ? "border-customRedAlt"
      : "border-customRed";
  const backgroundColor =
    isPrimary === "false"
      ? hovered
        ? "bg-customRed"
        : "bg-white"
      : hovered
      ? "bg-customRedAlt"
      : "bg-customRed";
  const textColor =
    isPrimary === "false" && !hovered ? "text-customRed" : "text-white";

  return (
    <div
      className={`py-[14px] px-4 text-base/[19.2px] font-firaGo font-meidum border rounded-[10px] ${borderColor} ${backgroundColor} text-nowrap cursor-pointer`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={{ width: width, height: height }}
      onClick={isPrimary === "true" ? onSubmit : onClose}
    >
      <p className={`${textColor}`}>{children}</p>
    </div>
  );
}

export default CustomButton;
