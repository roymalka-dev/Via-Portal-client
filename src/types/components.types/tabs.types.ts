/* eslint-disable @typescript-eslint/no-explicit-any */
export type CustomTabPanelType = {
  label: string;
  component: React.ComponentType<any> | React.FC<any>;
  data?: any;
};
