import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/authenticationSlice";
import { Section } from "../";
import styles from "./Dashboard.module.css";

const dummyTodos = [
  {
    _id: "1",
    title: "Complete Project Proposal",
    priority: "High",
    dueDate: "2024-03-01",
    section: "Backlog",
    checklists: [
      {
        _id: "1",
        checklistText: "Research project requirements",
        isComplete: true,
      },
      {
        _id: "2",
        checklistText: "Draft proposal outline",
        isComplete: false,
      },
      {
        _id: "3",
        checklistText: "Gather necessary resources",
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
    checklists: [
      {
        _id: "4",
        checklistText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "5",
        checklistText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse sapiente nesciunt labore id architecto, excepturi cumque illum sint laborum animi deserunt porro perferendis recusandae iure harum magnam eius eos.",
        isComplete: true,
      },
      {
        _id: "6",
        checklistText: "Gather data and visuals",
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
    checklists: [
      {
        _id: "7",
        checklistText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "8",
        checklistText: "Outline presentation content",
        isComplete: true,
      },
      {
        _id: "9",
        checklistText: "Gather data and visuals",
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
    checklists: [
      {
        _id: "10",
        checklistText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "11",
        checklistText: "Outline presentation content",
        isComplete: true,
      },
      {
        _id: "12",
        checklistText: "Gather data and visuals",
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
    checklists: [
      {
        _id: "13",
        checklistText: "Create slide templates",
        isComplete: true,
      },
      {
        _id: "14",
        checklistText: "Outline presentation content",
        isComplete: false,
      },
      {
        _id: "15",
        checklistText: "Gather data and visuals",
        isComplete: false,
      },
    ],
    link: "https://example.com/presentation",
  },
];

const options = ["week", "month", "year"];
const sections = ["Backlog", "ToDo", "In Progress", "Done"];

const Dashboard = () => {
  const [todaysDate, setTodaysDate] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [todos, setTodos] = useState(dummyTodos);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setTodaysDate(formattedDate);
  }, []);

  const toggleDropdown = (todoId) => {
    setOpenDropdownId((prevId) => (prevId === todoId ? null : todoId));
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderSections = () => {
    // Initialize an object to store todos grouped by section
    const todosBySection = Object.fromEntries(
      sections.map((section) => [section, []])
    );

    // Group todos by section
    todos.forEach((todo) => {
      const sectionName = todo.section;
      todosBySection[sectionName].push(todo);
    });

    return (
      <>
        {/* Map over sections and render Section components */}
        {sections.map((sectionName, index) => (
          <Section
            key={index}
            title={sectionName}
            plusIcon={sectionName === sections[1]}
            todosBySection={todosBySection[sectionName]}
            sections={sections}
            openDropdownId={openDropdownId}
            toggleDropdown={toggleDropdown}
          />
        ))}
      </>
    );
  };

  return (
    <div className={styles.mainSubContainer}>
      <div className={styles.header}>
        <h2 className={styles.greetingText}>
          Welcome! {userData?.userName ?? "Kumar"}
        </h2>
        <time dateTime={todaysDate}>{todaysDate}</time>
      </div>
      <section className={styles.content}>
        <div className={styles.heading}>
          <h3>Board</h3>
          <select
            className={styles.select}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {options.map((option, index) => (
              <option key={index}>{`This ${option}`}</option>
            ))}
          </select>
        </div>
        <div className={styles.container}>{renderSections()}</div>
      </section>
    </div>
  );
};

export default Dashboard;
