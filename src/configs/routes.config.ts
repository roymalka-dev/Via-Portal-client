import React from "react";

//componetnts imports
import { routeType } from "@/types/routes.types";
import PageLoader from "@/components/common/loaders/PageLoader";

//direct imports
import MainLayout from "@/layouts/MainLayout";
import LayoutLoader from "@/components/common/loaders/LayoutLoader";
import AuthLayout from "@/layouts/AuthLayout";
import NotFound from "@/views/auth/NotFound";
import AccessDenied from "@/views/auth/AccessDenied";
import ScopingPage from "@/views/scoping/ScopingPage";

//lazy imports
const Dashboard = React.lazy(() => import("@/views/dashboard/DashboardPage"));
const TravelLogic = React.lazy(
  () => import("@/views/travelLogic/TravelLogicPage")
);

const ShiftsPage = React.lazy(() => import("@/views/shifts/ShiftsPage"));
const TravelLogicCreate = React.lazy(
  () => import("@/views/travelLogic/create/TravelLogicCreatePage")
);

const TravelLogicImport = React.lazy(
  () => import("@/views/travelLogic/import/TravelLogicImportPage")
);
const TravelLogicRepository = React.lazy(
  () => import("@/views/travelLogic/repository/TravelLogicRepositoryPage")
);
const Checklist = React.lazy(() => import("@/views/checklist/ChecklistPage"));
const ChecklistItems = React.lazy(
  () => import("@/views/checklist/items/ChecklistItemsPage")
);
const ChecklistCreate = React.lazy(
  () => import("@/views/checklist/create/ChecklistCreateExecPage")
);
const ChecklistRepository = React.lazy(
  () => import("@/views/checklist/repository/ChecklistRepositoryPage")
);
const ChecklistExecution = React.lazy(
  () => import("@/views/checklist/execution/ChecklistExecutionPage")
);

const ControlPanel = React.lazy(
  () => import("@/views/control-panel/ControlPanelPage")
);

const LoginPage = React.lazy(() => import("@/views/auth/LoginPage"));

export const routes: routeType[] = [
  {
    path: "/",
    key: "root",
    component: MainLayout,
    protect: true,
    authority: "user",
    loader: LayoutLoader,
    children: [
      {
        path: "/",
        key: "dashboard",
        component: Dashboard,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/travel-logic",
        key: "travel-logic",
        component: TravelLogic,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/travel-logic/create",
        key: "travel-logic-create",
        component: TravelLogicCreate,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/travel-logic/import",
        key: "travel-logic-import",
        component: TravelLogicImport,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/travel-logic/repository",
        key: "travel-logic-repository",
        component: TravelLogicRepository,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/checklist",
        key: "checklist",
        component: Checklist,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/checklist/create",
        key: "checklist-create",
        component: ChecklistCreate,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/checklist/repository",
        key: "checklist-repository",
        component: ChecklistRepository,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/checklist/items",
        key: "checklist-items",
        component: ChecklistItems,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/checklist/execution/:id",
        key: "checklist-execution",
        component: ChecklistExecution,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/scoping",
        key: "scoping",
        component: ScopingPage,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/shifts",
        key: "shifts",
        component: ShiftsPage,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
      {
        path: "/control-panel/",
        key: "control-panel",
        component: ControlPanel,
        protect: true,
        authority: "user",
        loader: PageLoader,
      },
    ],
  },
  {
    path: "/auth",
    key: "auth",
    component: AuthLayout,
    protect: false,
    authority: "PUBLIC",
    loader: LayoutLoader,
    redirect: "/auth/login",
    children: [
      {
        path: "/auth/login",
        key: "auth-login",
        component: LoginPage,
        protect: false,
        authority: "PUBLIC",
        loader: PageLoader,
      },
    ],
  },
  {
    key: "not-found",
    path: "*",
    component: NotFound,
    loader: PageLoader,
    protect: false,
    children: [],
  },
  {
    key: "access-denied",
    path: "/access-denied",
    component: AccessDenied,
    loader: PageLoader,
    protect: false,
    children: [],
  },
];
