import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";
import { PageLoader } from "./components";

// Lazy-loaded components
const Register = lazy(() => import("./pages/RegisterPage.jsx"));
const Login = lazy(() => import("./pages/LoginPage.jsx"));
const Dashboard = lazy(() => import("./pages/DashboardPage.jsx"));
const Analytics = lazy(() => import("./pages/AnalyticsPage.jsx"));
const Setting = lazy(() => import("./pages/SettingPage.jsx"));

const route = createBrowserRouter([
  // Unprotected route
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },

  // Protected routes
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorBoundary />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "analytics", element: <Analytics /> },
      { path: "setting", element: <Setting /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={route} />
        <ToastContainer />
      </Suspense>
    </PersistGate>
  </Provider>
);
