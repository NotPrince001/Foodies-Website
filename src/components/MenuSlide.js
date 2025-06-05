import React from "react";
import { useState } from "react";
import MenuItem from "./MenuItem";
import "../styles/MenuSlide.css";

const MenuSlide = ({ itemCards, title }) => {
  const [hideButtonText, setHideButtonText] = useState("Hide");
  return (
    <div>
      <div className="title-div">
        <h3>{title}</h3>
        <button
          onClick={() =>
            hideButtonText === "Hide"
              ? setHideButtonText("Show")
              : setHideButtonText("Hide")
          }
        >
          {hideButtonText}
        </button>
      </div>
      <div className={hideButtonText === "Show" ? "hidden" : " "}>
        {itemCards.map((item) => (
          <MenuItem
            key={item?.card?.info?.id}
            name={item?.card?.info?.name}
            price={item?.card?.info?.defaultPrice || item?.card?.info?.price}
            img={item?.card?.info?.imageId}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSlide;
