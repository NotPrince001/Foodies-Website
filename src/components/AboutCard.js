import "../styles/AboutCard.css";

const AboutCard = (props) => {
  const { name, location, bio, img, instagram } = props;

  return (
    <div className="about-card">
      <img src={img} alt="User Image" className="user-image ml-[100px]" />
      <h1 className="user-name">{name}</h1>
      <h2 className="user-location">{location}</h2>
      <p className="user-bio">{bio}</p>
      {instagram && (
        <a
          href={"https://instagram.com/prince__chauhan__001__"}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <span className="instagram-icon">📷</span>
          {instagram}
        </a>
      )}
    </div>
  );
};

export default AboutCard;
