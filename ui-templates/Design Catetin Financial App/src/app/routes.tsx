import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ScanReceiptPage } from "./pages/ScanReceiptPage";
import { ReviewReceiptPage } from "./pages/ReviewReceiptPage";
import { InsightsPage } from "./pages/InsightsPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "scan",
        Component: ScanReceiptPage,
      },
      {
        path: "review-receipt",
        Component: ReviewReceiptPage,
      },
      {
        path: "insights",
        Component: InsightsPage,
      },
    ],
  },
]);
