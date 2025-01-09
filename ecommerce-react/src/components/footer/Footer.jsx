import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © 2025 Projet E-Commerce |{" "}
      <a
        href="https://theo-portfolio.herokuapp.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        PORTFOLIO
      </a>
      <a
        href="https://www.linkedin.com/in/th%C3%A9o-everaere/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LINKEDIN
      </a>
    </footer>
  );
};

export default Footer;
