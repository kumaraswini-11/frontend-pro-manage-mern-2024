import { useSelector } from "react-redux";
import { selectUserData } from "../redux/slices/authenticationSlice.js";
import { FaCircle } from "../utils/iconExports.js";
import { Sidebar } from "../components";
import { useFetchAnalyticsQuery } from "../redux/api/todoApi.js";
import styles from "../styles/Analytics.module.css";

function PriorityItem({ name, count }) {
  return (
    <div className={styles.priorityItem}>
      <span>
        <FaCircle className={styles.dotIcon} />
      </span>
      <span className={styles.priorityText}>{name}</span>

      <span className={styles.priorityCount}>
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

function AnalyticsPage() {
  const userData = useSelector(selectUserData);
  // Fetch analytics data using the useFetchAnalyticsQuery hook
  const {
    data: analyticsData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchAnalyticsQuery(userData._id);
  // console.log(analyticsData);

  // Define left section data
  const leftSectionData = [
    {
      name: "Backlog Tasks",
      count: analyticsData?.analyticsData?.backlogCount || 0,
    },
    {
      name: "To-do Tasks",
      count: analyticsData?.analyticsData?.todoCount || 0,
    },
    {
      name: "In-Progress Tasks",
      count: analyticsData?.analyticsData?.progressCount || 0,
    },
    {
      name: "Completed Tasks",
      count: analyticsData?.analyticsData?.completedCount || 0,
    },
  ];

  // Define right section data
  const rightSectionData = [
    {
      name: "Low Priority",
      count: analyticsData?.analyticsData?.lowPriorityCount || 0,
    },
    {
      name: "Moderate Priority",
      count: analyticsData?.analyticsData?.moderatePriorityCount || 0,
    },
    {
      name: "High Priority",
      count: analyticsData?.analyticsData?.highPriorityCount || 0,
    },
    {
      name: "Due Date Tasks",
      count: analyticsData?.analyticsData?.tasksWithDueDateCount || 0,
    },
  ];

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="mainContent">
        {isLoading ? (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            Loading...
          </p>
        ) : (
          <>
            <h2 className={styles.title}>Analytics</h2>

            <div className={styles.subContainer}>
              {/* Left Section */}
              <div className={styles.section}>
                {leftSectionData.map((task) => (
                  <PriorityItem
                    key={task.name}
                    name={task.name}
                    count={task.count}
                  />
                ))}
              </div>

              {/* Right Section */}
              <div className={styles.section}>
                {rightSectionData.map((task) => (
                  <PriorityItem
                    key={task.name}
                    name={task.name}
                    count={task.count}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AnalyticsPage;
