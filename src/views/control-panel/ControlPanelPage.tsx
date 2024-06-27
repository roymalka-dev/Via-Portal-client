import CustomTabs from "@/components/common/tabs/CustomTabs";
import { CustomTabPanelType } from "@/types/components.types/tabs.types";
import { lazy } from "react";

const UserManagementSection = lazy(
  () => import("@/views/control-panel/sections/UserManagementSection")
);
const Configurations = lazy(
  () => import("@/views/control-panel/sections/ConfigurationsSection")
);

const ChecklistTagsSection = lazy(
  () => import("@/views/control-panel/sections/ChecklistTagsSection")
);

const ActivityMonitorSection = lazy(
  () =>
    import(
      "@/views/control-panel/sections/activity-monitor/ActivityMonitorSection"
    )
);

const ControlPanelPage = () => {
  const controlPaneldTabs: CustomTabPanelType[] = [
    {
      label: "User Management",
      component: UserManagementSection,
      data: null,
    },
    {
      label: "Checklist Tags",
      component: ChecklistTagsSection,
      data: null,
    },
    {
      label: "Configurations",
      component: Configurations,
      data: null,
    },
    {
      label: "Activity Monitor",
      component: ActivityMonitorSection,
      data: null,
    },
  ];
  return <CustomTabs tabs={controlPaneldTabs} />;
};

export default ControlPanelPage;
