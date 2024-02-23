import React, { useCallback, useState } from "react";
import { FaPlus, VscCollapseAll } from "../../utils/iconExports.js";
import { Card, AddEditModal } from "../";
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
    const [isOpen, setIsOpen] = useState(false);

    const handleCollapseAll = useCallback(() => {
      setIsAllCollapsed((prevState) => !prevState);
    }, []);

    const handleAddTodo = () => {
      setIsOpen(true);
    };

    return (
      <article className={`${styles.section} ${styles.scrollableSection}`}>
        <div className={styles.subsection}>
          <h4>{title}</h4>
          <div className={styles.iconContainer}>
            {plusIcon && (
              <FaPlus className={styles.icon} onClick={handleAddTodo} />
            )}
            <VscCollapseAll
              className={styles.icon}
              onClick={handleCollapseAll}
            />
          </div>
        </div>
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

        {/* Add Modal */}
        {plusIcon && isOpen && (
          <AddEditModal isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </article>
    );
  }
);

export default Section;
