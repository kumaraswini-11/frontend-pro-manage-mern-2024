import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiLayout,
  GoDatabase,
  CiSettings,
  IoLogOutOutline,
} from "../../utils/iconExports.js";
import ProManageLogo from "../../assets/images/ProManageLogo.png";
import { ConfirmModal } from "../";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
          <NavItem to="/dashboard" icon={<FiLayout />} text="Board" />
          <NavItem to="/analytics" icon={<GoDatabase />} text="Analytics" />
          <NavItem to="/setting" icon={<CiSettings />} text="Settings" />
        </ul>
      </nav>

      {/* Logout */}
      <div className={styles.logout}>
        <Link
          to=""
          className={styles.logoutLink}
          onClick={() => setShowLogoutModal(true)}
        >
          <span className={`${styles.icon} ${styles.logoutIcon}`}>
            <IoLogOutOutline />
          </span>
          <span className={styles.logoutText}>Log out</span>
        </Link>
      </div>

      {/* Render Logout Modal */}
      {showLogoutModal && (
        <ConfirmModal
          isOpen={showLogoutModal}
          setIsOpen={setShowLogoutModal}
          isDeleteModal={true}
        />
      )}
    </aside>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <li className={styles.navItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.selected : ""}`
        }
      >
        <span className={styles.icon}>{icon}</span>
        <span className={styles.linkText}>{text}</span>
      </NavLink>
    </li>
  );
}

export default Sidebar;
