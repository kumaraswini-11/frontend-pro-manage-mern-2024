import { Sidebar, Setting } from "../components";

function SettingPage() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="mainContent">
        <Setting />
      </main>
    </div>
  );
}

export default SettingPage;
