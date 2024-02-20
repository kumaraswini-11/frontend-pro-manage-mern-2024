import { Link } from "react-router-dom";
import {
  FiLayout,
  GoDatabase,
  CiSettings,
  IoLogOutOutline,
} from "../../utils/IconExports.js";
import ProManageLogo from "../../assets/images/ProManageLogo.png";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.aside}>
      {/* Brand */}
      <div className={styles.logo}>
        <img
          src={ProManageLogo}
          alt="Pro Manage Logo"
          className={styles.icon}
        />
        <h2 className={styles.logoText}>Pro Manage</h2>
      </div>

      {/* Navigation Links */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              <FiLayout className={styles.icon} />
              <span className={styles.linkText}>Board</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/analytics" className={styles.navLink}>
              <GoDatabase className={styles.icon} />
              <span className={styles.linkText}>Analytics</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/setting" className={styles.navLink}>
              <CiSettings className={styles.icon} />
              <span className={styles.linkText}>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className={styles.logout}>
        <Link to="/login" className={styles.logoutLink}>
          <IoLogOutOutline className={`${styles.icon} ${styles.logoutIcon}`} />
          <span className={styles.logoutText}>Log out</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
