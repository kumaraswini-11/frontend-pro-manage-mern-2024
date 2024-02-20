import React, { useCallback, useState } from "react";
import { FaPlus, VscCollapseAll } from "../../utils/IconExports.js";
import { Card } from "../";
import styles from "./Dashboard.module.css";

const Section = React.memo(
  ({
    title,
    plusIcon,
    todosBySection,
    sections,
    openDropdownId,
    toggleDropdown,
  }) => {
    const [isAllCollapsed, setIsAllCollapsed] = useState(false);

    const handleCollapseAll = useCallback(() => {
      setIsAllCollapsed((prevState) => !prevState);
    }, []);

    return (
      <article className={`${styles.section} ${styles.scrollableSection}`}>
        {/* Subsection */}
        <div className={styles.subsection}>
          <h4>{title}</h4>
          <div className={styles.iconContainer}>
            {plusIcon && <FaPlus className={styles.icon} />}
            <VscCollapseAll
              className={styles.icon}
              onClick={handleCollapseAll}
            />
          </div>
        </div>
        {/* Cards */}
        <div className={styles.cardsContainer}>
          {todosBySection?.map((todo) => (
            <Card
              key={todo._id}
              todo={todo}
              isCollapsed={isAllCollapsed}
              sections={sections}
              openDropdownId={openDropdownId}
              toggleDropdown={toggleDropdown}
            />
          ))}
        </div>
      </article>
    );
  }
);

export default Section;
