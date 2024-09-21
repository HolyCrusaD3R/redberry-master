import { Link } from "react-router-dom";
import redberryLogo from "../assets/LOGO.png";

function Header() {
  return (
    <div className="w-screen h-[100px] border mb-20">
      <div className="h-full ml-[162px] mr-[162px] flex items-center">
        <Link to={"/"}>
          <img src={redberryLogo} alt="Redberry Logo" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
