import { CircularProgressProps } from "@mui/material";

export interface PropTypes extends CircularProgressProps {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  size: string | number;
}
