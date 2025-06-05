import { useEffect, useState } from "react";
import AboutCard from "./AboutCard";

const About = () => {
  const [userData, setUserData] = useState({});

  const fetchAbout = async () => {
    try {
      const response = await fetch("https://api.github.com/users/NotPrince001");
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <div>
      <AboutCard
        name={userData.name || ""}
        location={userData.location || ""}
        bio={userData.bio || ""}
        img={userData.avatar_url || null}
        instagram="Instagram"
      />
    </div>
  );
};

export default About;
