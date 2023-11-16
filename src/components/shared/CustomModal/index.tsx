import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IProps } from "./types";

import "./index.css";

const CustomModal = ({
  open,
  onClose,
  children,
  ...rest
}: IProps): JSX.Element => {
  return (
    <Modal open={open} {...rest}>
      <div className="container-block">
        <div className="modal-container">
          <CloseIcon
            className="icon"
            onClick={onClose}
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              zIndex: 100,
            }}
          />
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
