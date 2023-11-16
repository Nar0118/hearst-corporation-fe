import { CircularProgress, CircularProgressProps } from "@mui/material";

function Progress({
  size = "4rem",
  color = "success",
  ...props
}: CircularProgressProps) {
  return <CircularProgress {...props} size={size} color={color} />;
}

export default Progress;
