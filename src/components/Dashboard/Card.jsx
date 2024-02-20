import React, { useState, useEffect, forwardRef } from "react";
import { toast } from "react-toastify";
import {
  FaCircle,
  PiDotsThreeBold,
  IoIosArrowUp,
  IoIosArrowDown,
} from "../../utils/IconExports.js";
import { DropdownMenu } from "../";
import styles from "./Dashboard.module.css";

const ContextMenu = ({ isVisible, xPos, yPos, onEdit, onDelete, onShare }) => {
  if (!isVisible) return null;

  const handleClickOutside = () => {
    // Hide the context menu when clicked outside
    // Implement this function to handle click outside logic
  };

  return (
    <div
      className="contextMenu"
      style={{ left: xPos, top: yPos }}
      onClick={handleClickOutside}
    >
      <div className="menuItem" onClick={onEdit}>
        Edit
      </div>
      <div className="menuItem" onClick={onDelete}>
        Delete
      </div>
      <div className="menuItem" onClick={onShare}>
        Share
      </div>
    </div>
  );
};

const menuOptions = [
  { label: "Edit", action: "edit" },
  { label: "Share", action: "share" },
  { label: "Delete", action: "delete" },
];

const Card = React.memo(
  forwardRef(
    ({ todo, isCollapsed, sections, openDropdownId, toggleDropdown }, ref) => {
      const [isChecklistOpen, setIsChecklistOpen] = useState(false);
      const [checklistState, setChecklistState] = useState(
        todo.checklists.map((checklist) => checklist.isComplete)
      );
      const [selectedOption, setSelectedOption] = useState(null);

      const handleOptionSelect = (action) => {
        setSelectedOption(action);

        if (action === "edit") {
          console.log("Edit popup should come");
        } else if (action === "delete") {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete?"
          );
          if (confirmDelete) {
            console.log("Delete confirmed");
          } else {
            console.log("Delete cancelled");
          }
        } else if (action === "share") {
          const baseUrl = window.location.origin;
          const sharedTodoUrl = `${baseUrl}/shared-todo/${todo.link}`;

          navigator.clipboard
            .writeText(sharedTodoUrl)
            .then(() => {
              toast("Link Copied");
            })
            .catch((error) => {
              console.error("Failed to copy to clipboard:", error);
            });
        }

        toggleDropdown(todo?._id);
      };

      const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
      const handleToggleDropdown = (e) => {
        e.preventDefault();
        setDropdownPosition({ x: e.clientX, y: e.clientY });
        toggleDropdown(todo?._id);
      };

      const getPriorityClass = (priority) => {
        switch (priority.toLowerCase()) {
          case "low":
            return styles.lowPriority;
          case "moderate":
            return styles.moderatePriority;
          case "high":
            return styles.highPriority;
          default:
            return "";
        }
      };

      useEffect(() => {
        // Update the child component state when the prop changes
        setIsChecklistOpen(false);
      }, [isCollapsed]);

      const toggleChecklist = () => {
        setIsChecklistOpen((prevState) => !prevState);
      };

      const handleCheckboxChange = (checklistId) => {
        setChecklistState((prevState) => {
          const nextState = prevState.map((checked, index) =>
            index === checklistId ? !checked : checked
          );

          // Log the updated state
          console.log(nextState);
          return nextState;
        });
      };

      return (
        <div className={styles.innerSubsection}>
          <div className={styles.prioritySubsection}>
            <div className={styles.priority}>
              <span>
                <FaCircle
                  className={`${styles.dotIcon} ${getPriorityClass(
                    todo.priority
                  )}`}
                />
              </span>
              <span className={styles.priorityText}>
                {todo?.priority} Priority
              </span>
            </div>
            <PiDotsThreeBold
              className={styles.icon}
              onClick={handleToggleDropdown}
            />
            {/* Render the dropdown menu based on isDropdownOpen state */}
            {openDropdownId === todo?._id && (
              <DropdownMenu
                options={menuOptions}
                onSelect={handleOptionSelect}
                xPos={dropdownPosition.x}
                yPos={dropdownPosition.y}
              />
            )}
          </div>

          <h4 className={styles.heroTitle}>{todo.title}</h4>

          <div className={styles.checklistSubsection}>
            <div className={styles.checklist}>
              <label>
                <span>Checklist</span>
                <span>
                  ({checklistState.filter((isChecked) => isChecked).length}/
                  {checklistState.length})
                </span>
              </label>
              {!isChecklistOpen ? (
                <IoIosArrowDown
                  className={styles.icon}
                  onClick={toggleChecklist}
                />
              ) : (
                <IoIosArrowUp
                  className={styles.icon}
                  onClick={toggleChecklist}
                />
              )}
            </div>
            <div
              className={styles.tasks}
              style={{
                display: isChecklistOpen ? "block" : "none",
              }}
            >
              {todo?.checklists?.map((checklist, index) => (
                <div key={checklist._id} className={styles.task}>
                  <input
                    type="checkbox"
                    id={checklist._id}
                    checked={checklistState[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label htmlFor={checklist._id}>
                    {checklist.checklistText}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.optionsSubsection}>
            {/* color #5A5A5A */}
            <div
              className={styles.date}
              style={{
                backgroundColor:
                  todo.section.toLowerCase() === "done"
                    ? "#63C05B"
                    : new Date() < new Date(todo.dueDate)
                    ? "#DBDBDB"
                    : "#CF3636",
                color:
                  new Date() < new Date(todo.dueDate) &&
                  todo.section.toLowerCase() !== "done"
                    ? "#5A5A5A"
                    : "#FFFFFF",
              }}
            >
              {todo.dueDate}
            </div>
            <div className={styles.subOptions}>
              {/* Render all section names except the current section */}
              {sections?.map((section) => {
                if (section !== todo.section) {
                  return (
                    <div className={styles.option} key={section}>
                      {section.toLowerCase() === "todo"
                        ? "TO-DO"
                        : section.toLowerCase() === "in progress"
                        ? "Progress"
                        : section}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      );
    }
  )
);

export default Card;
