import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import WeekDetail from "./pages/WeekDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/week/:weekId",
    Component: WeekDetail,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/settings",
    Component: Settings,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);