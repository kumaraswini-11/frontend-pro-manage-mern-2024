import { Sidebar, Dashboard } from "../components";

function DashboardPage() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="mainContent">
        <Dashboard />
      </main>
    </div>
  );
}

export default DashboardPage;
