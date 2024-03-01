import { useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import ProManageLogo from "../assets/images/ProManageLogo.png";
import { CustomInput } from "../components";
import getPriorityIconColor from "../utils/getPriorityIconColor";
import { getFormattedDate } from "../utils/getFormatedDate";
import { useFetchSharedTodoDetailsQuery } from "../redux/api/todoApi";
import styles from "../styles/SharedTodoPage.module.css";

function SharedTodoPage() {
  const { uniqueLinkId } = useParams();
  const { data, isLoading } = useFetchSharedTodoDetailsQuery(uniqueLinkId);
  // console.log(data.todo);
  return (
    <>
      <header className={styles.header}>
        <img src={ProManageLogo} alt="ProManage Logo" />
        <h1>Pro Manage</h1>
      </header>

      <section>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        ) : data ? (
          <div className={styles.container}>
            <div className={styles.priority}>
              <FaCircle
                className={styles.icon}
                style={{ color: getPriorityIconColor(data.todo.priority) }}
              />
              <span>{`${data.todo.priority} Priority`}</span>
            </div>

            <h2 className={styles.sectionTitle}>{data.todo.title}</h2>

            <div className={styles.checklist}>
              <label>
                <span>Checklist</span>
                <span>
                  (
                  {
                    data.todo.todoItems.filter(
                      (todoItem) => todoItem.isComplete
                    ).length
                  }
                  /{data.todo.todoItems.length})
                </span>
              </label>

              <div className={styles.scrollableSection}>
                {/* this div, set width between scrollbar and Input */}
                <div style={{ width: "98.5%" }}>
                  {data.todo.todoItems.map((todoItem) => (
                    <CustomInput
                      key={todoItem._id}
                      value={todoItem.todoText}
                      checked={todoItem.isComplete}
                      isReadOnly={true}
                    />
                  ))}
                </div>
              </div>
            </div>

            {data?.todo.dueDate !== "" && (
              <div className={styles.dueDate}>
                <span>Due Date</span>
                <span className={styles.dateBox}>
                  {getFormattedDate("2", data?.todo.dueDate)}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div>This todo doesn't exist or the link is invalid.</div>
        )}
      </section>
    </>
  );
}

export default SharedTodoPage;
