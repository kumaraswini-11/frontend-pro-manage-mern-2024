import { FaCircle } from "../utils/IconExports.js";
import styles from "../styles/SharedTodoPage.module.css";

function SharedTodoPage() {
  return (
    <main className={styles.main}>
      <section className={styles.task}>
        <div className={styles.taskHeader}>
          <span className={styles.icon}>
            <FaCircle />
          </span>
          <span className={styles.priority}>High Priority</span>
        </div>
        <h2 className={styles.taskTitle}>Full Title</h2>

        <div className={styles.taskDetails} id="taskListContainer">
          <h5>
            Checklist <span>(1/3)</span>
          </h5>
          <div className={styles.taskListContainer}>
            <div className={styles.taskItem}>
              <input type="checkbox" id="checkbox1" />
              <label htmlFor="checkbox1">Data1</label>
            </div>
            {/* Other task items */}
          </div>
          <div className={styles.dueDate}>
            <span className={styles.dueDateText}>Due Date</span>
            <span className={styles.dueDateValue}>Feb 10</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SharedTodoPage;
