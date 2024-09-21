import { useNavigate } from "react-router-dom";
import LeftArrow from "./svg/LeftArrow";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-description="უკან დაბრუნება / back button"
    >
      <LeftArrow />
    </button>
  );
}
