import React from "react";
import { FaCircle } from "../utils/iconExports.js";
import { Sidebar } from "../components";
import styles from "../styles/Analytics.module.css";

const leftSectionData = [
  { name: "Backlog Tasks", count: 16 },
  { name: "To-do Tasks", count: 14 },
  { name: "In-Progress Tasks", count: 3 },
  { name: "Completed Tasks", count: 22 },
];
const rightSectionData = [
  { name: "Low Priority", count: 16 },
  { name: "Moderate Priority", count: 14 },
  { name: "High Priority", count: 3 },
  { name: "Due Date Tasks", count: 3 },
];

function PriorityItem({ name, count }) {
  return (
    <div className={styles.priorityItem}>
      <span>
        <FaCircle className={styles.dotIcon} />
      </span>
      <span className={styles.priorityText}>{name}</span>
      <span className={styles.priorityCount}>
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="mainContent">
        <h2 className={styles.title}>Analytics</h2>

        <div className={styles.subContainer}>
          {/* Left Section */}
          <div className={styles.section}>
            {leftSectionData.map((task, index) => (
              <PriorityItem key={index} name={task.name} count={task.count} />
            ))}
          </div>

          {/* Right Section */}
          <div className={styles.section}>
            {rightSectionData.map((task, index) => (
              <PriorityItem key={index} name={task.name} count={task.count} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AnalyticsPage;
