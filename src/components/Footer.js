import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>© {new Date().getFullYear()} Foodies Pvt. Ltd. All rights reserved.</p>
      <p>Contact: support@example.com</p>
    </div>
  );
};

export default Footer;
