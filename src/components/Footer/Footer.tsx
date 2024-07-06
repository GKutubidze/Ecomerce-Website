import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.menu}>
        <div className={styles.section}>
          {menuItems.map((item, key) => {
            return (
              <div key={key} className={styles.menuItemContainer}>
                <span className={styles.item}> {item}</span>
                <div className={styles.line}></div>
              </div>
            );
          })}
        </div>

        <div className={styles.social}>
          {socialIcons.map((item, key) => {
            return (
              <a href={item.link} key={key} target="_blank">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className={styles.socialIcon}
                />{" "}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;

const menuItems = ["About Us", "Blog", "FAQs", "Order Tracking", "Contact"];

const socialIcons = [
  {
    icon: "/SocialIcons/facebook.svg",
    alt: "facebook",
    link: "https://www.facebook.com",
  },
  {
    icon: "/SocialIcons/instagram.svg",
    alt: "instagram",
    link: "https://www.instagram.com",
  },
  {
    icon: "/SocialIcons/twitter-x.svg",
    alt: "twitter-x",
    link: "https://www.twitter.com",
  },
];
