import React from "react";
import { FaPlus, FaCircle } from "react-icons/fa";
import { VscCollapseAll } from "react-icons/vsc";
import { PiDotsThreeBold } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import styles from "./Dashboard.module.css";

// Individual section component for better modularity
function Card() {
  return (
    <>
      {/* Inner Subsection */}
      <div className={styles.innerSubsection}>
        {/* Priority Subsection */}
        <div className={styles.prioritySubsection}>
          <div className={styles.priority}>
            <span>
              <FaCircle className={styles.dotIcon} />
            </span>
            <span className={styles.priorityText}>High priority</span>
          </div>
          <PiDotsThreeBold className={styles.icon} />
        </div>

        {/* Hero Title */}
        <h4 className={styles.heroTitle}>Hero Section</h4>

        {/* Checklist Subsection */}
        <div className={styles.checklistSubsection}>
          <div className={styles.checklist}>
            <label>
              <span>Checklist</span>
              <span>(1/3)</span>
            </label>
            <IoIosArrowUp className={styles.icon} />
          </div>
          <div className={styles.tasks}>
            {/* Task */}
            <div className={styles.task}>
              <input type="checkbox" id="task1" />
              <label htmlFor="task1">Task to be done 1</label>
            </div>
            {/* Task */}
            <div className={styles.task}>
              <input type="checkbox" id="task2" />
              <label htmlFor="task2">Task to be done 2</label>
            </div>
            {/* Task */}
            <div className={styles.task}>
              <input type="checkbox" id="task3" />
              <label htmlFor="task3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti inventore dignissimos, labore pariatur officia
                similique tempora repellat, cum vitae quasi amet, sunt deleniti
                natus animi itaque ea accusantium? Possimus, doloribus.
              </label>
            </div>
          </div>
        </div>

        {/* Options Subsection */}
        <div className={styles.optionsSubsection}>
          <div className={styles.date}>Feb 10th</div>
          <div className={styles.subOptions}>
            <div className={styles.option}>Backlog</div>
            <div className={styles.option}>Progress</div>
            <div className={styles.option}>Done</div>
          </div>
        </div>
      </div>
    </>
  );
}

function Section() {
  return (
    <article className={styles.section}>
      {/* Subsection */}
      <div className={styles.subsection}>
        <h4>Backlog</h4>
        <div className={styles.iconContainer}>
          <FaPlus className={styles.icon} />
          <VscCollapseAll className={styles.icon} />
        </div>
      </div>

      {/* Cards */}
      <Card />
      <Card />
    </article>
  );
}

// Main Dashboard Component
function Dashboard() {
  return (
    <div className={styles.mainSubContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Welcome! Kumar</h2>
        <time dateTime="2024-01-12">12th Jan, 2024</time>
      </div>

      {/* Main Content */}
      <section className={styles.content}>
        {/* Heading Section */}
        <div className={styles.heading}>
          <h3>Board</h3>
          <select className={styles.select}>
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>

        {/* Container Section */}
        <div className={styles.container}>
          {/* Section repeated 3 more times */}
          <Section />
          <Section />
          <Section />
          <Section />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
