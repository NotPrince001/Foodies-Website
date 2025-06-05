import { useEffect, useState } from "react";
import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router";
import MenuSlide from "./MenuSlide";
import "../styles/Menu.css";

const Menu = () => {
  const [menuData, setMenuData] = useState(null);
  const { resId } = useParams();
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.63270&lng=77.21980&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

  const fetchMenu = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setMenuData(json);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (menuData === null) return <ShimmerCard />;

  const { name, avgRating, costForTwoMessage } =
    menuData?.data?.cards[2]?.card?.card?.info;

  const cards =
    menuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const menuItems = cards.slice(1, -2).flatMap((item, index) => {
    if (item.card.card.itemCards) {
      return [
        {
          itemCards: item.card.card.itemCards,
          title: item.card.card.title,
          key: index,
        },
      ];
    }
    if (item.card.card.categories) {
      return item.card.card.categories.map((category, catIndex) => ({
        itemCards: category.itemCards,
        title: item.card.card.title,
        key: `${index} - ${catIndex}`,
      }));
    }
  });

  return (
    <div className="menu-container">
      {/* Header Section */}
      <div className="menu-header">
        <div className="header-content">
          <h1 className="restaurant-name">{name}</h1>

          <div className="restaurant-info">
            <div className="info-badge rating-badge">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{avgRating} Rating</span>
            </div>

            <div className="info-badge cost-badge">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{costForTwoMessage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="menu-content">
        <div className="menu-title-section">
          <h2 className="menu-title">Our Menu</h2>
          <div className="title-underline"></div>
        </div>

        <div className="menu-items">
          {menuItems.map((e) => (
            <div key={e.key} className="menu-item-card">
              <MenuSlide itemCards={e.itemCards} title={e.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
