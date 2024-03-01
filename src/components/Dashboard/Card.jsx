import React, { useState, useEffect, forwardRef } from "react";
import { toast } from "react-toastify";
import {
  FaCircle,
  PiDotsThreeBold,
  IoIosArrowUp,
  IoIosArrowDown,
} from "../../utils/iconExports.js";
import getPriorityIconColor from "../../utils/getPriorityIconColor.js";
import getTodoItemOptionsStyle from "../../utils/getTodoItemOptionsStyle.js";
import { getFormattedDate } from "../../utils/getFormatedDate.js";
import {
  DropdownContainer,
  CustomInput,
  AddEditModal,
  ConfirmModal,
} from "../";
import useClickOutside from "../../hooks/useClickOutside.js";
import truncateTitle from "../../utils/truncateTitle.js";
import {
  useUpdateSectionMutation,
  useUpdateCheckboxMutation,
} from "../../redux/api/todoApi.js";
import styles from "./Dashboard.module.css";

const menuOptions = [
  { label: "Edit", action: "edit" },
  { label: "Share", action: "share" },
  { label: "Delete", action: "delete" },
];

const Card = forwardRef(
  ({ todo, isCollapsed, sections, openDropdownId, toggleDropdown }, ref) => {
    const [isChecklistOpen, setIsChecklistOpen] = useState(false);
    const [checklistState, setChecklistState] = useState(
      todo.todoItems.map((todoItem) => todoItem.isComplete)
    );
    const [selectedOption, setSelectedOption] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toggleDropdownState, setToggleDropdownState] = useState(false);

    const [updateCheckbox, { isLoading: upadteCheckBoxLoading }] =
      useUpdateCheckboxMutation();
    const [updateSection, { isLoading }] = useUpdateSectionMutation();

    useEffect(() => {
      setIsChecklistOpen(false);
    }, [isCollapsed]);

    const outsideCardDropdownContainerRef = useClickOutside(() => {
      setToggleDropdownState(false);
    });

    const handleToggleDropdown = () => {
      setToggleDropdownState(!toggleDropdownState);
      toggleDropdown(todo?._id);
    };

    const handleOptionSelect = (action) => {
      setSelectedOption(action);
      switch (action) {
        case "edit":
          setShowEditModal(true);
          break;
        case "delete":
          setShowDeleteModal(true);
          break;
        case "share":
          const baseUrl = window.location.origin;
          const sharedTodoUrl = `${baseUrl}/shared-todo/${todo.link}`;
          navigator.clipboard
            .writeText(sharedTodoUrl)
            .then(() => toast("Link Copied"))
            .catch((error) =>
              console.error("Failed to copy to clipboard:", error)
            );
          break;
        default:
          break;
      }
      toggleDropdown(todo?._id);
      setToggleDropdownState(false);
    };

    const toggleChecklist = () => {
      setIsChecklistOpen((prevState) => !prevState);
    };

    const handleCheckboxChange = async (
      checklistId,
      todoItemId,
      isComplete
    ) => {
      setChecklistState((prevState) => {
        return prevState.map((checked, index) =>
          index === checklistId ? !checked : checked
        );
      });

      // api call to updateCheckbox
      const { data } = await updateCheckbox({
        todoItemId,
        isComplete,
      });
    };

    const handelSectionUpdate = async (todoId, section) => {
      const res = await updateSection({ todoId, section });
    };

    return (
      <div className={styles.innerSubsection}>
        <div className={styles.prioritySubsection}>
          <div className={styles.priority}>
            <span>
              <FaCircle
                className={styles.dotIcon}
                style={{ color: getPriorityIconColor(todo?.priority) }}
              />
            </span>
            <span className={styles.priorityText}>
              {todo?.priority} Priority
            </span>
          </div>
          <div
            ref={outsideCardDropdownContainerRef}
            style={{ position: "relative" }}
          >
            <PiDotsThreeBold
              className={styles.icon}
              onClick={handleToggleDropdown}
            />
            {toggleDropdownState && openDropdownId === todo?._id && (
              <DropdownContainer
                options={menuOptions}
                onSelect={handleOptionSelect}
              />
            )}
          </div>
        </div>

        <h4 className={styles.heroTitle} title={todo.title}>
          {truncateTitle(todo.title, 40)}
        </h4>

        <div className={styles.checklistSubsection}>
          <div className={styles.checklist}>
            <label>
              <span>Checklist</span>
              <span>
                ({checklistState.filter((isChecked) => isChecked).length}/
                {checklistState.length})
              </span>
            </label>
            {isChecklistOpen ? (
              <IoIosArrowUp className={styles.icon} onClick={toggleChecklist} />
            ) : (
              <IoIosArrowDown
                className={styles.icon}
                onClick={toggleChecklist}
              />
            )}
          </div>
          <div
            className={styles.tasks}
            style={{ display: isChecklistOpen ? "block" : "none" }}
          >
            {todo?.todoItems?.map((todoItem, index) => (
              <CustomInput
                key={todoItem._id}
                value={todoItem.todoText}
                checked={checklistState[index]}
                onCheckboxChange={() =>
                  handleCheckboxChange(
                    index,
                    todoItem._id,
                    !todoItem.isComplete
                  )
                }
                // onDelete={() => {}}
                isReadOnly={true}
              />
            ))}
          </div>
        </div>

        <div className={styles.optionsSubsection}>
          <div>
            {todo.dueDate === null || todo.dueDate === "" ? (
              ""
            ) : (
              <div
                className={styles.date}
                style={getTodoItemOptionsStyle(todo)}
              >
                {getFormattedDate("2", todo.dueDate)}
              </div>
            )}
          </div>
          <div className={styles.subOptions}>
            {sections?.map((section) =>
              section !== todo.section ? (
                <div
                  className={styles.option}
                  key={section}
                  onClick={() => handelSectionUpdate(todo._id, section)}
                >
                  {section.toLowerCase() === "todo"
                    ? "TO-DO"
                    : section.toLowerCase() === "in progress"
                    ? "Progress"
                    : section}
                </div>
              ) : null
            )}
          </div>
        </div>

        {showEditModal && (
          <AddEditModal
            isOpen={showEditModal}
            setIsOpen={setShowEditModal}
            editTodo={todo}
          />
        )}

        {showDeleteModal && (
          <ConfirmModal
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            uniqueId={todo._id}
          />
        )}
      </div>
    );
  }
);

export default Card;
