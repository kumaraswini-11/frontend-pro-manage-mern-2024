import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import ProManageLogo from "../assets/images/ProManageLogo.png";
import { CustomInput } from "../components";
import getPriorityIconColor from "../utils/getPriorityIconColor";
import styles from "../styles/SharedTodoPage.module.css";

const dummyData = {
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
      _id: "1",
      todoText: "Research project requirements",
      isComplete: true,
    },
    {
      _id: "2",
      todoText: "Draft proposal outline",
      isComplete: false,
    },
  ],
  link: "https://example.com/project-proposal",
};

function SharedTodoPage() {
  const [data, setData] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  const { uniqueLinkId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchTodoDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchIndivisualTodoDetails(uniqueLinkId, signal);
        if (response.success) {
          setData(response.data.indivisualTodoDetails);
        }
      } catch (error) {
        console.error("This todo doesn't exist or the link is invalid.", error);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueLinkId) {
      fetchTodoDetails();
    }

    return () => {
      abortController.abort();
    };
  }, [uniqueLinkId]);

  return (
    <>
      <header className={styles.header}>
        <img src={ProManageLogo} alt="ProManage Logo" />
        <h1>Pro Manage</h1>
      </header>

      <section>
        {loading ? (
          <div>Loading...</div>
        ) : data ? (
          <div className={styles.container}>
            <div className={styles.priority}>
              <FaCircle
                className={styles.icon}
                style={{ color: getPriorityIconColor(data?.priority) }}
              />
              <span>{`${data.priority} Priority`}</span>
            </div>

            <h2 className={styles.sectionTitle}>{data.title}</h2>

            <div className={styles.checklist}>
              <label>
                <span>Checklist</span>
                <span>
                  (
                  {
                    data.todoItems.filter((todoItem) => todoItem.isComplete)
                      .length
                  }
                  /{data.todoItems.length})
                </span>
              </label>

              <div className={styles.scrollableSection}>
                {/* this div, set width between scrollbar and Input */}
                <div style={{ width: "98.5%" }}>
                  {data.todoItems.map((todoItem) => (
                    <CustomInput
                      key={todoItem._id}
                      value={todoItem.todoText}
                      checked={todoItem.isComplete}
                      readOnly
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.dueDate}>
              <span>Due Date</span>
              <span className={styles.dateBox}>{data.dueDate}</span>
            </div>
          </div>
        ) : (
          <div>This todo doesn't exist or the link is invalid.</div>
        )}
      </section>
    </>
  );
}

export default SharedTodoPage;
