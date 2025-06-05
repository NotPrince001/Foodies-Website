import "../styles/Card.css";
const Card = ({ resturant }) => {
  const { name, avgRating, cuisines, locality, cloudinaryImageId } =
    resturant?.info;
  const imgURL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`;
  return (
    <div className="res-card">
      <img src={imgURL} alt="Resturant Image" className="res-img" />
      <h2>{name}</h2>
      <h3>{avgRating}</h3>
      <div>{cuisines.join(", ")}</div>
      <div>{locality}</div>
    </div>
  );
};

export default Card;
