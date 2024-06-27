import { SvgIconComponent } from "@mui/icons-material";

export interface InavigationItem {
  name: string;
  path: string;
  icon: SvgIconComponent | React.ElementType;
  authority: string;
  children?: InavigationItem[];
}
