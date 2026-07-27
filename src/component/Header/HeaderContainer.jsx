import { FC } from "react";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

const HeaderContainer = () => {
  return (
    <div className="bg-white sticky z-20">
      <HeaderTop />
      <div className="absolute w-full z-10">
        <HeaderBottom />
      </div>
    </div>
  );
};
export default HeaderContainer;
