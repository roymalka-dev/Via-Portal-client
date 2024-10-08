import { InavigationItem } from "@/types/navigation.types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PolylineIcon from "@mui/icons-material/Polyline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PageviewIcon from "@mui/icons-material/Pageview";
import ListIcon from "@mui/icons-material/List";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
export const navigationItems: InavigationItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    authority: "USER",
  },

  {
    name: "Manual",
    path: "/",
    icon: SubscriptionsIcon,
    authority: "USER",
    children: [
      {
        name: "Travel Logic",
        path: "/travel-logic",
        icon: PolylineIcon,
        authority: "USER",
        children: [
          {
            name: "Create",
            path: "/travel-logic/create",
            icon: AddCircleIcon,
            authority: "USER",
          },
          {
            name: "Import",
            path: "/travel-logic/import",
            icon: UploadFileIcon,
            authority: "USER",
          },
          /*
      {
        name: "Repository",
        path: "/travel-logic/repository",
        icon: PageviewIcon,
        authority: "USER",
      },
      */
        ],
      },
      {
        name: "Checklist",
        path: "/checklist",
        icon: ChecklistIcon,
        authority: "USER",
        children: [
          {
            name: "Create Execution",
            path: "/checklist/create",
            icon: AutoFixHighIcon,
            authority: "USER",
          },
          {
            name: "Items",
            path: "/checklist/items",
            icon: ListIcon,
            authority: "USER",
          },
          {
            name: "Repository",
            path: "/checklist/repository",
            icon: PageviewIcon,
            authority: "USER",
          },
        ],
      },
      {
        name: "Scoping",
        path: "/scoping",
        icon: SavedSearchIcon,
        authority: "USER",
        children: [
          {
            name: "Create",
            path: "/scoping/create",
            icon: AddCircleIcon,
            authority: "USER",
          },
        ],
      },
      {
        name: "Test Execution",
        path: "/test-execution",
        icon: DocumentScannerIcon,
        authority: "USER",
        children: [
          {
            name: "Create",
            path: "/test-execution/create",
            icon: AddCircleIcon,
            authority: "USER",
          },
        ],
      },
      {
        name: "Shifts",
        path: "/shifts",
        icon: CalendarMonthIcon,
        authority: "USER",
      },
    ],
  },
  {
    name: "Wizard",
    path: "/wizard",
    icon: AutoFixHighIcon,
    authority: "USER",
  },
  {
    name: "Control Panel",
    path: "/control-panel",
    icon: SettingsIcon,
    authority: "ADMIN",
  },
];
