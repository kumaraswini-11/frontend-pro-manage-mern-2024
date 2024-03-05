import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/authenticationSlice";
import { IoIosArrowDown } from "../../utils/iconExports.js";
import { getFormattedDate } from "../../utils/getFormatedDate.js";
import { DropdownContainer, Section } from "../";
import useClickOutside from "../../hooks/useClickOutside.js";
import { useFetchAllTodosByTimePeriodQuery } from "../../redux/api/todoApi.js";
import styles from "./Dashboard.module.css";

const menuOptions = [
  { label: "Today", action: "today" },
  { label: "This Week", action: "week" },
  { label: "This Month", action: "month" },
];
const sections = ["Backlog", "Todo", "In Progress", "Done"];
// ["Backlog", "ToDo", "In Progress", "Done"];

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(menuOptions[1]?.label);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const userData = useSelector(selectUserData);
  const outsideTimeDropdownContainerRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  });

  const {
    data: todos,
    isLoading,
    refetch,
  } = useFetchAllTodosByTimePeriodQuery(
    menuOptions.find((option) => option.label === selectedOption)?.action
  );
  // console.log(
  //   useFetchAllTodosByTimePeriodQuery(
  //     menuOptions.find((option) => option.label === selectedOption)?.action
  //   )
  // );

  const handleSelectedOption = (action) => {
    const timeStampLabel = menuOptions.find(
      (option) => option.action === action
    )?.label;
    setSelectedOption(timeStampLabel);
    // fetchAllTodosByTimePeriod(action);
    refetch();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (todoId) => {
    setOpenDropdownId((prevId) => (prevId === todoId ? null : todoId));
  };

  const renderSections = () => {
    if (isLoading || !todos) {
      return <div>Loading...</div>;
    }

    const todosBySection = {};
    sections.forEach((section) => {
      todosBySection[section] = [];
    });

    todos?.todos?.forEach((todo) => {
      todosBySection[todo.section].push(todo);
    });

    return sections.map((sectionName, index) => (
      <Section
        key={index}
        title={sectionName}
        plusIcon={sectionName === sections[1]}
        todosBySection={todosBySection[sectionName]}
        sections={sections}
        openDropdownId={openDropdownId}
        toggleDropdown={toggleDropdown}
      />
    ));
  };

  return (
    <div className={styles.mainSubContainer}>
      <div className={styles.header}>
        <h2 className={styles.greetingText}>
          Welcome! {userData?.fullName ?? "User"}
        </h2>
        <time dateTime={getFormattedDate("1", new Date())}>
          {getFormattedDate("1", new Date())}
        </time>
      </div>
      <section className={styles.content}>
        <div className={styles.heading}>
          <h3>Board</h3>
          <div
            className={`${styles.select} ${styles.scrollableSection}`}
            ref={outsideTimeDropdownContainerRef}
          >
            <label onClick={() => setIsDropdownOpen((prevState) => !prevState)}>
              <span>{selectedOption}</span>
              <IoIosArrowDown />
            </label>
            {isDropdownOpen && (
              <DropdownContainer
                options={menuOptions}
                onSelect={handleSelectedOption}
                isTimeDropdownToggle={true}
              />
            )}
          </div>
        </div>
        <div className={`${styles.container} ${styles.scrollableSection}`}>
          {renderSections()}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
