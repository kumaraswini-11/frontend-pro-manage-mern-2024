# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

=============================================

````javascript
const dummyTodos = [
  {
    _id: "1",
    title: "Complete Project Proposal",
    priority: "high",
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
    title: "Prepare Presentation Slides",
    priority: "moderate",
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
        checklistText: "Outline presentation content",
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
    priority: "low",
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
    priority: "high",
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
    priority: "moderate",
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
];```


````
