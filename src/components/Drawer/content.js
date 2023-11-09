import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PreviewIcon from "@mui/icons-material/Preview";
import WorkerForm from "../WorkerForm";
import GradingIcon from "@mui/icons-material/Grading";
import ViewWorkersApplications from "../ViewWorkersApplications";

import styles from "./styles.module.scss";
import ViewEmployees from "../ViewEmployees";
const { iconSize } = styles;
const drawerOptions = [
  {
    icon: <NoteAltIcon className={iconSize} />,
    name: "طلب توظيف للعمال",
    content: <WorkerForm />,
  },
  {
    icon: <PreviewIcon className={iconSize} />,
    name: "عرض الطلبات",
    content: <ViewWorkersApplications />,
  },
  {
    icon: <GradingIcon className={iconSize} />,
    name: "عرض العمال",
    content: <ViewEmployees />,
  },
];
export default drawerOptions;
