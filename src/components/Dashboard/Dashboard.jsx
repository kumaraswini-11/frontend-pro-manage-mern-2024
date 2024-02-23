import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/authenticationSlice";
import { IoIosArrowDown } from "../../utils/iconExports.js";
import { DropdownContainer, Section } from "../";
import useClickOutside from "../../hooks/useClickOutside.js";
import styles from "./Dashboard.module.css";

// Dummy Data
const dummyTodos = [
  {
    _id: "1",
    title: "Complete Project Proposal",
    priority: "High",
    dueDate: "2024-03-01",
    section: "Backlog",
    todoItems: [
      {
        _id: "1",
        todoText: "Research project requirements",
        isComplete: true,
      },
      {
        _id: "2",
        todoText: "Draft proposal outline",
        isComplete: false,
      },
      {
        _id: "3",
        todoText: "Gather necessary resources",
        isComplete: false,
      },
    ],
    link: "https://example.com/project-proposal",
  },
  {
    _id: "2",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse sapiente nesciunt labore id architecto.",
    priority: "Moderate",
    dueDate: "2024-02-28",
    section: "ToDo",
    todoItems: [
      {
        _id: "4",
        todoText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "5",
        todoText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse sapiente nesciunt labore id architecto, excepturi cumque illum sint laborum animi deserunt porro perferendis recusandae iure harum magnam eius eos.",
        isComplete: true,
      },
      {
        _id: "6",
        todoText: "Gather data and visuals",
        isComplete: false,
      },
    ],
    link: "https://example.com/presentation",
  },
  {
    _id: "3",
    title: "Prepare Presentation Slides",
    priority: "Low",
    dueDate: "2024-02-28",
    section: "In Progress",
    todoItems: [
      {
        _id: "7",
        todoText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "8",
        todoText: "Outline presentation content",
        isComplete: true,
      },
      {
        _id: "9",
        todoText: "Gather data and visuals",
        isComplete: false,
      },
    ],
    link: "https://example.com/presentation",
  },
  {
    _id: "4",
    title: "Prepare Presentation Slides",
    priority: "High",
    dueDate: "2024-02-28",
    section: "Done",
    todoItems: [
      {
        _id: "10",
        todoText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "11",
        todoText: "Outline presentation content",
        isComplete: true,
      },
      {
        _id: "12",
        todoText: "Gather data and visuals",
        isComplete: false,
      },
    ],
    link: "https://example.com/presentation",
  },
  {
    _id: "5",
    title: "Prepare 5th Presentation Slides",
    priority: "Moderate",
    dueDate: "2024-02-15",
    section: "Backlog",
    todoItems: [
      {
        _id: "13",
        todoText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "14",
        todoText: "Outline presentation content",
        isComplete: false,
      },
      {
        _id: "15",
        todoText: "Gather data and visuals",
        isComplete: false,
      },
    ],
    link: "https://example.com/presentation",
  },
];

const menuOptions = [
  { label: "Today", action: "today" },
  { label: "This Week", action: "week" },
  { label: "This Month", action: "month" },
];
const sections = ["Backlog", "ToDo", "In Progress", "Done"];

const Dashboard = () => {
  const [todaysDate, setTodaysDate] = useState("");
  const [selectedOption, setSelectedOption] = useState(menuOptions[1]?.label);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [todos, setTodos] = useState(dummyTodos);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const userData = useSelector(selectUserData);
  const outsideTimeDropdownContainerRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  });

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setTodaysDate(formattedDate);
  }, []);

  const handleSelectedOption = (action) => {
    setSelectedOption(
      menuOptions.find((option) => option.action === action)?.label
    );
    // API call based on selected value
    console.log(action, "clicked");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (todoId) => {
    setOpenDropdownId((prevId) => (prevId === todoId ? null : todoId));
  };

  const renderSections = () => {
    const todosBySection = {};
    sections.forEach((section) => {
      todosBySection[section] = [];
    });

    todos.forEach((todo) => {
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
          Welcome! {userData?.userName ?? "User"}
        </h2>
        <time dateTime={todaysDate}>{todaysDate}</time>
      </div>
      <section className={styles.content}>
        <div className={styles.heading}>
          <h3>Board</h3>
          <div className={styles.select} ref={outsideTimeDropdownContainerRef}>
            {/* // For future reference: This is an example of how to use a custom dropdown menu
            <select
              className={styles.select}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              {menuOptions.map((option, index) => (
                <option key={index} value={option.action}>
                  {option.label}
                </option>
              ))}
            </select> */}

            <label onClick={() => setIsDropdownOpen((prevState) => !prevState)}>
              <span>{selectedOption}</span>
              <span>
                <IoIosArrowDown />
              </span>
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
        <div className={styles.container}>{renderSections()}</div>
      </section>
    </div>
  );
};

export default Dashboard;
